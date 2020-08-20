import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import translate, { dateLanguage } from '../../locales';

import { unformatNumber, formatPhone, formatCPF } from '../../util/format';

import {
  SubmitButton,
  Input,
  GenderContainer,
  ButtonContainer,
  GenderLabel,
  TextButton,
  TextButtonText,
  DateInput,
} from './styles';

import {
  handleChangeText,
  handleBlur,
  handleSubmit,
} from '../validation/validations/profileValidation';

export default function ProfileForm({ handleFormSubmit, loading }) {
  const profile = useSelector(state => state.user.profile);

  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    name: profile.name,
    phone: formatPhone(profile.phone),
    email: profile.email,
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  });

  const phoneRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  async function onChangeText(id, value) {
    const { errors, text } = await handleChangeText(form, id, value);
    if (errors) {
      setFieldErrors(errors);
    } else {
      if (id === 'oldPassword') {
        const { oldPassword, password, ...rest } = fieldErrors;
        setFieldErrors(rest);
      } else if (id === 'password') {
        const { password, passwordConfirmation, ...rest } = fieldErrors;
        setFieldErrors(rest);
      } else {
        const { [id]: _, ...rest } = fieldErrors;
        setFieldErrors(rest);
      }
    }

    setForm({ ...form, [id]: text });
  }

  async function onBlur(id) {
    if (!touched[id]) {
      setTouched({ ...touched, [id]: true });

      const errors = await handleBlur(form);

      if (errors) {
        console.log(errors)
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
        placeholder={translate('first_name_placeholder')}
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
        placeholder={translate('phone_placeholder')}
        ref={phoneRef}
        keyboardType="phone-pad"
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
        placeholder={translate('email_placeholder_2')}
        ref={emailRef}
        autoCorrect={false}
        onChangeText={text => onChangeText('email', text)}
        onBlur={() => onBlur('email')}
        value={form.email}
        returnKeyType="next"
        onSubmitEditing={() => oldPasswordRef.current.focus()}
        error={fieldErrors.email && touched.email && fieldErrors.email}
      />
      <Input
        icon="lock"
        secureTextEntry
        placeholder={translate('old_password_placeholder')}
        ref={oldPasswordRef}
        onChangeText={text => onChangeText('oldPassword', text)}
        onBlur={() => onBlur('oldPassword')}
        value={form.oldPassword}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        error={
          fieldErrors.oldPassword &&
          touched.oldPassword &&
          fieldErrors.oldPassword
        }
      />
      <Input
        icon="lock"
        secureTextEntry
        placeholder={translate('new_password_placeholder')}
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
        placeholder={translate('password_confirmation_placeholder')}
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
        {translate('save_button')}
      </SubmitButton>
    </>
  );
}
