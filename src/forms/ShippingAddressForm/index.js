import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import translate from '../../locales';

import { SubmitButton, Input } from './styles';
import api from '../../services/api';
import { cepMask } from '../validation/masks';

import {
  handleChangeText,
  handleBlur,
  handleSubmit,
} from '../validation/validations/deliveryAddressValidation';

export default function DeliveryAddressForm({ handleFormSubmit, loading }) {
  const [lockForm, setLockForm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [haveAddress, setHaveAddress] = useState(false);
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    addressee: '',
    street: '',
    city: '',
    complement: '',
  });

  const addresseeRef = useRef();
  // const postalCodeRef = useRef();
  const streetRef = useRef();
  // const streetNumberRef = useRef();
  // const neighborhoodRef = useRef();
  const cityRef = useRef();
  // const stateRef = useRef();
  const complementRef = useRef();
  // const referenceRef = useRef();

  const userName = useSelector(state => state.user.profile.name);

  useEffect(() => {
    async function checkHaveAddress() {
      setLockForm(true);
      const response = await api.get('address');

      if (response.data) {
        setHaveAddress(true);

        const data = {
          ...response.data,
          addressee: userName,
        };

        setForm(data);
        setLockForm(false);
      } else {
        setLockForm(false);
      }
      
      console.log(response);
    }

    checkHaveAddress();
  }, [userName]);

  async function onChangeText(id, value) {
    const { errors, text } = await handleChangeText(form, id, value);
    if (errors) {
      setFieldErrors(errors);
    } else {
      const { [id]: _, ...rest } = fieldErrors;
      setFieldErrors(rest);
    }

    setForm({ ...form, [id]: text });
  }

  async function onBlur(id) {
    if (!touched[id]) {
      setTouched({ ...touched, [id]: true });

      const errors = await handleBlur(form);

      if (errors) {
        setFieldErrors(errors);
      } else {
        const { [id]: _, ...rest } = fieldErrors;
        setFieldErrors(rest);
      }
    }
  }

  async function onSubmit() {
    const errors = await handleSubmit(form);

    if (!errors) {
      handleFormSubmit(form, haveAddress);
    } else {
      let alltouched;
      Object.keys(errors).forEach(
        key => (alltouched = { ...alltouched, [key]: true }),
      );
      setTouched(alltouched);
      setFieldErrors(errors);
    }
  }

  return (
    <>
      <Input
        editable={!lockForm}
        placeholder="Receiver"
        maxLength={50}
        autoCorrect={false}
        autoCapitalize="words"
        ref={addresseeRef}
        isFocused={() => addresseeRef.current.isFocused()}
        onChangeText={text => onChangeText('addressee', text)}
        onBlur={() => onBlur('addressee')}
        value={form.addressee}
        returnKeyType="next"
        onSubmitEditing={() => streetRef.current.focus()}
        error={
          fieldErrors.addressee && touched.addressee && fieldErrors.addressee
        }
      />
      <Input
        editable={!lockForm}
        placeholder="Street"
        maxLength={100}
        autoCorrect={false}
        autoCapitalize="words"
        isFocused={() => streetRef.current.isFocused()}
        onChangeText={text => onChangeText('street', text)}
        onBlur={() => onBlur('street')}
        value={form.street}
        ref={streetRef}
        returnKeyType="next"
        onSubmitEditing={() => cityRef.current.focus()}
        error={fieldErrors.street && touched.street && fieldErrors.street}
      />
      <Input
        editable={!lockForm}
        placeholder="City"
        maxLength={50}
        autoCorrect={false}
        autoCapitalize="words"
        isFocused={() => cityRef.current.isFocused()}
        onChangeText={text => onChangeText('city', text)}
        onBlur={() => onBlur('city')}
        value={form.city}
        ref={cityRef}
        returnKeyType="next"
        onSubmitEditing={() => complementRef.current.focus()}
        error={fieldErrors.city && touched.city && fieldErrors.city}
      />
      <Input
        editable={!lockForm}
        placeholder="Complement"
        autoCorrect={false}
        autoCapitalize="words"
        isFocused={() => complementRef.current.isFocused()}
        onChangeText={text => onChangeText('complement', text)}
        onBlur={() => onBlur('complement')}
        value={form.complement}
        ref={complementRef}
        returnKeyType="next"
        onSubmitEditing={() => handleFormSubmit}
        error={
          fieldErrors.complement && touched.complement && fieldErrors.complement
        }
      />
      <SubmitButton onPress={onSubmit} loading={loading}>
        Save
      </SubmitButton>
    </>
  );
}