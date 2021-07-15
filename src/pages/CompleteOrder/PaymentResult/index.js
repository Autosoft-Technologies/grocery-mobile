import React, {useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';

import colors from '../../../styles/colors';

import {
  Container,
  SuccessAnimationContainer,
  SuccessAnimation,
  SucessTextContainer,
  SucessTextHeader,
  SucessText,
  FailedAnimationContainer,
  FailedAnimation,
  FailedTextContainer,
  FailedTextHeader,
  FailedText,
  ContinueButton,
  TryAgainButton,
  TryAgainText,
} from './styles';
import translate from '../../../locales';

export default function PaymentResult({navigation}) {
  const status = navigation.getParam('status');
  const redirect = navigation.getParam('redirect');
  console.log(redirect)
  
  useEffect(() => {
    if (status === 'success') {
      StatusBar.setBackgroundColor(colors.success);
      Linking.openURL(redirect).catch(err => alert('Connection failed'));
    } else if (status === 'failed') {
      StatusBar.setBackgroundColor(colors.failed);
    }

    return () => {
      StatusBar.setBackgroundColor(colors.primary);
    };
  }, [status]);

  return (
    <Container status={status}>
      {status === 'success' ? (
        <>
          <SuccessAnimationContainer>
            <SuccessAnimation/>
          </SuccessAnimationContainer>
          <SucessTextContainer>
            <SucessTextHeader>
              Success
            </SucessTextHeader>
            <SucessText>Order completed successfully. For more details, check your orders</SucessText>
          </SucessTextContainer>
        </>
      ) : (
        <>
          <FailedAnimationContainer>
            <FailedAnimation/>
          </FailedAnimationContainer>
          <FailedTextContainer>
            <FailedTextHeader>
              Failed
            </FailedTextHeader>
            <FailedText>Payment failed. For more details, check your orders</FailedText>
          </FailedTextContainer>
        </>
      )}
      <ContinueButton
        onPress={() => navigation.navigate('Home')}
        colors={
          status === 'success'
            ? [colors.white, colors.success]
            : [colors.white, colors.failed]
        }>
        Continue
      </ContinueButton>
      {status === 'failed' && (
        <TryAgainButton onPress={() => navigation.pop(2)}>
          <TryAgainText>Try again</TryAgainText>
        </TryAgainButton>
      )}
    </Container>
  );
}
