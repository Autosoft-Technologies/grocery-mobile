import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import { signUpRequest } from '../../store/modules/auth/actions';

import SignUpForm from '../../forms/SignUpForm';

import logo from '../../assets/logo.png';

import {
  Container,
  Image,
  FormContainer,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  // const loading = false;
  const loading = useSelector(state => state.auth.loading);

  function handleFormSubmit({
    name,
    phone,
    email,
    password,
  }) {
    dispatch(
      signUpRequest(
        name,
        phone,
        email,
        password,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <FormContainer>
          <Image source={logo} />
          <SignUpForm handleFormSubmit={handleFormSubmit} loading={loading} />
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText >
              I already have an account
            </SignLinkText>
          </SignLink>
        </FormContainer>
      </Container>
    </Background>
  );
}
