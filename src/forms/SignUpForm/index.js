import React, { useState, useRef, useEffect } from 'react';
import { Text, } from 'react-native';
import { format } from 'date-fns';

import translate, { dateLanguage } from '../../locales';

import { unformatNumber } from '../../util/format';

import {
  SubmitButton,
  Input,
} from './styles';

import {
  handleChangeText,
  handleBlur,
  handleSubmit,
} from '../validation/validations/signUpValidation';

export default function SignUpForm({ handleFormSubmit, loading }) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

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
      handleFormSubmit({
        ...form,
        phone: unformatNumber(form.phone),
      });
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
        icon="user"
        placeholder="Name"
        autoCorrect={false}
        autoCapitalize="words"
        onChangeText={text => onChangeText('name', text)}
        onBlur={() => onBlur('name')}
        value={form.name}
        returnKeyType="next"
        onSubmitEditing={() => phoneRef.current.focus()}
        error={fieldErrors.name && touched.name && fieldErrors.name}
      />
      <Input
        icon="phone"
        placeholder="Phone"
        keyboardType="phone-pad"
        ref={phoneRef}
        maxLength={15}
        autoCorrect={false}
        onChangeText={text => onChangeText('phone', text)}
        onBlur={() => onBlur('phone')}
        value={form.phone}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()}
        error={fieldErrors.phone && touched.phone && fieldErrors.phone}
      />
      
      <Input
        icon="envelope"
        placeholder="Email"
        ref={emailRef}
        autoCorrect={false}
        onChangeText={text => onChangeText('email', text)}
        onBlur={() => onBlur('email')}
        value={form.email}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        error={fieldErrors.email && touched.email && fieldErrors.email}
      />
      <Input
        icon="lock"
        secureTextEntry
        placeholder="Password"
        ref={passwordRef}
        onChangeText={text => onChangeText('password', text)}
        onBlur={() => onBlur('password')}
        value={form.password}
        returnKeyType="next"
        onSubmitEditing={() => passwordConfirmationRef.current.focus()}
        error={fieldErrors.password && touched.password && fieldErrors.password}
      />
      <Input
        icon="lock"
        secureTextEntry
        placeholder="Confirm the password"
        ref={passwordConfirmationRef}
        onChangeText={text => onChangeText('passwordConfirmation', text)}
        onBlur={() => onBlur('passwordConfirmation')}
        value={form.passwordConfirmation}
        returnKeyType="send"
        onSubmitEditing={handleFormSubmit}
        error={
          fieldErrors.passwordConfirmation &&
          touched.passwordConfirmation &&
          fieldErrors.passwordConfirmation
        }
      />
      <SubmitButton onPress={onSubmit} loading={loading}>
        <Text>Sign up</Text>
      </SubmitButton>
    </>
  );
}
