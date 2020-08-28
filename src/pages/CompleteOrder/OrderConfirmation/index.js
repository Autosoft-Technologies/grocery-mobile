import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Background from '../../../components/Background';

import { unformatNumber, unformatPrice } from '../../../util/format';
import api from '../../../services/api';

import CreditCard from '../../../components/CreditCard';

import {
  Container,
  CreditCardContainer,
  ShippingDetailsContainer,
  ShippingDetailsHeader,
  AddresseeContainer,
  AddresseeLabel,
  AddresseeText,
  AddressContainer,
  AddressLabel,
  AddressText,
  CityPostalCodeContainer,
  CityContainer,
  CityLabel,
  CityText,
  OrderSummaryContainer,
  OrderSummaryHeader,
  SubtotalContainer,
  SubtotalLabel,
  SubtotalText,
  DeliveryFeeContainer,
  DeliveryFeeLabel,
  DeliveryFeeText,
  TotalContainer,
  TotalLabel,
  TotalText,
  ConfirmButton,
} from './styles';

export default function OrderConfirmation({ navigation }) {
  const [loading, setLoading] = useState(false);

  const address = navigation.getParam('address');
  const orderDetails = navigation.getParam('orderDetails');
  const paymentMethod = navigation.getParam('paymentMethod');
  const creditCardInfo = navigation.getParam('creditCardInfo');

  const userId = useSelector(state => state.user.profile.id);

  const products = useSelector(state =>
    state.cart.map(product => ({
      product_id: product.id,
      quantity: product.amount,
      price: product.price,
      total: product.amount * product.price,
    })),
  );

  async function handleSubmit() {
    try {
      setLoading(true);
      if (paymentMethod === 'credit_card') {
        await api.post('orders', {
          user_id: userId,
          status: 'in_progress',
          addressee: address.addressee,
          ship_street: address.street,
          ship_city: address.city,
          payment_method: paymentMethod,
          cc_brand: creditCardInfo.brand,
          cc_last_4_digits: creditCardInfo.number.slice(-4),
          payment_condition: 1,
          delivery_fee: unformatPrice(orderDetails.deliveryFee),
          products,
        });
      } else if (paymentMethod === 'cash') {
        await api.post('orders', {
          user_id: userId,
          status: 'in_progress',
          addressee: address.addressee,
          ship_street: address.street,
          ship_city: address.city,
          payment_method: paymentMethod,
          payment_condition: 1,
          delivery_fee: unformatPrice(orderDetails.deliveryFee),
          products,
        });
      }
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'success' });
    } catch (err) {
      console.log(err);
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'failed' });
    }
  }

  return (
    <Background>
      <Container>
        {creditCardInfo && (
          <CreditCardContainer>
            <CreditCard data={creditCardInfo} height={150} />
          </CreditCardContainer>
        )}
        <ShippingDetailsContainer>
          <ShippingDetailsHeader>
            Delivery details
          </ShippingDetailsHeader>
          <AddresseeContainer>
            <AddresseeLabel>Addressee</AddresseeLabel>
            <AddresseeText>{address.addressee}</AddresseeText>
          </AddresseeContainer>
          <AddressContainer>
            <AddressLabel>Email</AddressLabel>
            <AddressText>{`${address.street}`}</AddressText>
          </AddressContainer>
          <CityPostalCodeContainer>
            <CityContainer>
              <CityLabel>City</CityLabel>
              <CityText>{address.city}</CityText>
            </CityContainer>
          </CityPostalCodeContainer>
        </ShippingDetailsContainer>
        <OrderSummaryContainer>
          <OrderSummaryHeader>
            Order details
          </OrderSummaryHeader>
          <SubtotalContainer>
            <SubtotalLabel>Subtotal</SubtotalLabel>
            <SubtotalText>{orderDetails.subtotal}</SubtotalText>
          </SubtotalContainer>
          <DeliveryFeeContainer>
            <DeliveryFeeLabel>
              Delivery fee
            </DeliveryFeeLabel>
            <DeliveryFeeText>{orderDetails.deliveryFee}</DeliveryFeeText>
          </DeliveryFeeContainer>
          <TotalContainer>
            <TotalLabel>Total</TotalLabel>
            <TotalText>{orderDetails.total}</TotalText>
          </TotalContainer>
        </OrderSummaryContainer>
        <ConfirmButton loading={loading} onPress={handleSubmit}>
          Finish
        </ConfirmButton>
      </Container>
    </Background>
  );
}
