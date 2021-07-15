import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddCardForm from '../../../forms/AddCardForm';

import masterCardImage from '../../../assets/mastercard.png';
import visaImage from '../../../assets/visa.png';
import amexImage from '../../../assets/amex.png';
import defaultImage from '../../../assets/default.png';

import {
  Wrapper,
  Container,
  PaymentMethodContainer,
  CashPayment,
  CashContainer,
  CashAnimationContainer,
  CashAnimation,
  CashPaymentText,
  MethodSelect,
  IconContainer,
  CreditCardIcon,
  CashIcon,
  MethodTitle,
  CreditCardPayment,
  CreditCardContainer,
  PaymentMethodHeader,
  SavedCardsList,
  CreditCardInfo,
  CreditCardNumberContainer,
  CreditCardSelect,
  CreditCardNumber,
  CreditCardBrand,
  CreditCardRemoveButton,
  NoCreditCardSaved,
  NoCreditCardSavedAnimationContainer,
  NoCreditCardSavedAnimation,
  NoCreditCardSavedText,
  AddCardButton,
  AddCardText,
  FormContainer,
  ContinueButton,
} from './styles';
import translate from '../../../locales';
import DeliveryAddressForm from "../../../forms/DeliveryAddressForm";
import {Input} from "../../../forms/DeliveryAddressForm/styles";
import {handleBlur} from "../../../forms/validation/validations/signUpValidation";

export default function PaymentMethod({navigation}) {
  const [methodSelected, setMethodSelected] = useState('mobilemoney');
  const [mmphone, setMmphone] = useState('');
  const [savedCreditCards, setSavedCreditCards] = useState([]);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardSelected, setCardSelected] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const address = navigation.getParam('address');
  const orderDetails = navigation.getParam('orderDetails');

  useEffect(() => {
    function loadSavedCards() {
      setSavedCreditCards([
        {
          id: '1',
          nameOnCard: 'John Doe',
          brand: 'mc',
          number: '5156165775083266',
          expirationMonth: '07',
          expirationYear: '20',
          cvv: '809',
        },
        {
          id: '2',
          nameOnCard: 'John Doe',
          brand: 'visa',
          number: '4916204201440339',
          expirationMonth: '12',
          expirationYear: '20',
          cvv: '399',
        },
        {
          id: '3',
          nameOnCard: 'John Doe',
          brand: 'amex',
          number: '378261444987459',
          expirationMonth: '08',
          expirationYear: '20',
          cvv: '7178',
        },
      ]);
    }

    // loadSavedCards();
  }, []);

  function brandIcon(brand) {
    switch (brand) {
      case 'mc':
        return masterCardImage;
      case 'visa':
        return visaImage;
      case 'amex':
        return amexImage;
      default:
        return defaultImage;
    }
  }

  function handleRemoveSavedCard(id) {
    cardSelected === id && setCardSelected(null);
    const creditCards = savedCreditCards.filter(card => card.id !== id);
    setSavedCreditCards(creditCards);
  }

  function handleFormSubmit({
                              brand,
                              nameOnCard,
                              number,
                              expirationDate,
                              cvv,
                            }) {
    const [expMonth, expYear] = expirationDate.split('/');
    setSavedCreditCards([
      ...savedCreditCards,
      {
        id: String(savedCreditCards.length + 1),
        nameOnCard,
        brand,
        number,
        expirationMonth: expMonth,
        expirationYear: expYear,
        cvv,
      },
    ]);
  }

  function renderCard({item}) {
    return (
      <CreditCardInfo>
        <CreditCardNumberContainer>
          <CreditCardSelect onPress={() => setCardSelected(item.id)}>
            <Icon
              name={
                cardSelected === item.id ? 'radiobox-marked' : 'radiobox-blank'
              }
              size={20}
              color="#666672"
            />
          </CreditCardSelect>
          <CreditCardNumber>{`xxxx xxxx xxxx ${item.number.slice(
            -4,
          )}`}</CreditCardNumber>
          <CreditCardBrand source={brandIcon(item.brand)}/>
        </CreditCardNumberContainer>
        <CreditCardRemoveButton onPress={() => handleRemoveSavedCard(item.id)}>
          <Icon name="delete" size={16} color="#666672"/>
        </CreditCardRemoveButton>
      </CreditCardInfo>
    );
  }
  // async function onBlur(id) {
  //   if (!touched[id]) {
  //     setTouched({ ...touched, [id]: true });
  //
  //     const errors = await handleBlur(form);
  //
  //     if (errors) {
  //       setFieldErrors(errors);
  //     } else {
  //       const { [id]: _, ...rest } = fieldErrors;
  //       setFieldErrors(rest);
  //     }
  //   }
  // }
  
  return (
    <Wrapper>
      <Container>
        <PaymentMethodContainer>
          <CashPayment onPress={() => setMethodSelected('mobilemoney')}>
            <MethodSelect>
              <Icon
                name={'radiobox-marked'}
                size={16}
                color="#fff"
              />
            </MethodSelect>
            <IconContainer>
              <CashIcon/>
              <MethodTitle>Mobile money</MethodTitle>
            </IconContainer>
          </CashPayment>
          {/*<CreditCardPayment onPress={() => setMethodSelected('credit_card')}>*/}
          {/*  <MethodSelect>*/}
          {/*    <Icon*/}
          {/*      name={*/}
          {/*        methodSelected === 'credit_card'*/}
          {/*          ? 'radiobox-marked'*/}
          {/*          : 'radiobox-blank'*/}
          {/*      }*/}
          {/*      size={16}*/}
          {/*      color="#fff"*/}
          {/*    />*/}
          {/*  </MethodSelect>*/}
          {/*  <IconContainer>*/}
          {/*    <CreditCardIcon />*/}
          {/*    <MethodTitle>Credit card</MethodTitle>*/}
          {/*  </IconContainer>*/}
          {/*</CreditCardPayment>*/}
        </PaymentMethodContainer>
        {/*{methodSelected === 'cash' ? (*/}
        <CashContainer>
          {/*<CashAnimationContainer>*/}
          {/*  <CashAnimation/>*/}
          {/*</CashAnimationContainer>*/}
          {/*<CashPaymentText>*/}
          {/*  Pay with mobile money*/}
          {/*</CashPaymentText>*/}
          <Container>
            <FormContainer>
              {/*<DeliveryAddressForm*/}
              {/*  handleFormSubmit={handleFormSubmit}*/}
              {/*  loading={loading}*/}
              {/*/>*/}
              <Input
                icon="phone"
                placeholder="Mobile money Phone"
                keyboardType="phone-pad"
                // ref={phoneRef}
                maxLength={15}
                autoCorrect={false}
                onChangeText={text => setMmphone(text)}
                // onBlur={() => onBlur('phone')}
                value={mmphone}
                // returnKeyType="next"
                // onSubmitEditing={() => emailRef.current.focus()}
                // error={fieldErrors.phone && touched.phone && fieldErrors.phone}
              />

              {/*<Input*/}
              {/*  // editable={!lockForm}*/}
              {/*  placeholder="Phone number"*/}
              {/*  maxLength={100}*/}
              {/*  // autoCorrect={false}*/}
              {/*  autoCapitalize="words"*/}
              {/*  onChangeText={text => setMmphone(text)}*/}
              {/*  value={mmphone}*/}
              {/*  // ref={streetRef}*/}
              {/*  // returnKeyType="next"*/}
              {/*  // onSubmitEditing={() => cityRef.current.focus()}*/}
              {/*  // error={fieldErrors.street && touched.street && fieldErrors.street}*/}
              {/*/>*/}
            </FormContainer>
          </Container>
          <ContinueButton
            onPress={() =>
              navigation.navigate('OrderConfirmation', {
                mmphone: mmphone,
                address,
                orderDetails,
                paymentMethod: methodSelected,
              })
            }>
            Continue
          </ContinueButton>
        </CashContainer>
        {/*) : (*/}
        {/*  <CreditCardContainer>*/}
        {/*    <PaymentMethodHeader>*/}
        {/*      Credit card*/}
        {/*    </PaymentMethodHeader>*/}
        {/*    {savedCreditCards.length ? (*/}
        {/*      <View>*/}
        {/*        <SavedCardsList*/}
        {/*          data={savedCreditCards}*/}
        {/*          keyExtractor={item => item.id}*/}
        {/*          renderItem={renderCard}*/}
        {/*        />*/}
        {/*      </View>*/}
        {/*    ) : (*/}
        {/*      <>*/}
        {/*        <NoCreditCardSaved>*/}
        {/*          <NoCreditCardSavedAnimationContainer>*/}
        {/*            <NoCreditCardSavedAnimation />*/}
        {/*          </NoCreditCardSavedAnimationContainer>*/}
        {/*          <NoCreditCardSavedText>*/}
        {/*            Please add a new credit card*/}
        {/*          </NoCreditCardSavedText>*/}
        {/*        </NoCreditCardSaved>*/}
        {/*      </>*/}
        {/*    )}*/}

        {/*    <AddCardButton*/}
        {/*      onPress={() => setShowCreditCardForm(!showCreditCardForm)}>*/}
        {/*      <AddCardText>Add card</AddCardText>*/}
        {/*      <Icon*/}
        {/*        name={showCreditCardForm ? 'chevron-down' : 'chevron-right'}*/}
        {/*        size={25}*/}
        {/*        color="#393647"*/}
        {/*      />*/}
        {/*    </AddCardButton>*/}
        {/*    {showCreditCardForm && (*/}
        {/*      <FormContainer>*/}
        {/*        <AddCardForm handleFormSubmit={handleFormSubmit} loading />*/}
        {/*      </FormContainer>*/}
        {/*    )}*/}

        {/*    <ContinueButton*/}
        {/*      onPress={() =>*/}
        {/*        navigation.navigate('OrderConfirmation', {*/}
        {/*          address,*/}
        {/*          orderDetails,*/}
        {/*          paymentMethod: methodSelected,*/}
        {/*          creditCardInfo: savedCreditCards.find(*/}
        {/*            creditCard => creditCard.id === String(cardSelected),*/}
        {/*          ),*/}
        {/*        })*/}
        {/*      }*/}
        {/*      enabled={cardSelected ? true : false}>*/}
        {/*      Continue*/}
        {/*    </ContinueButton>*/}
        {/*  </CreditCardContainer>*/}
        {/*)}*/}
      </Container>
    </Wrapper>
  );
}
