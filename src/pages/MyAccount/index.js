import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import translate from '../../locales';

import {
  Container,
  ProfileCard,
  IconContainer,
  ProfileLabel,
  ShippingAddressCard,
  ShippingAddressLabel,
} from './styles';

export default function MyAccount({ navigation }) {
  return (
    <Container>
      <ProfileCard onPress={() => navigation.navigate('Profile')}>
        <IconContainer>
          <Icon name="person" size={20} color="#3c8f2e" />
        </IconContainer>
        <ProfileLabel>Profile</ProfileLabel>
      </ProfileCard>
      <ShippingAddressCard
        onPress={() => navigation.navigate('ShippingAddress')}>
        <IconContainer>
          <Icon name="local-shipping" size={20} color="#3c8f2e" />
        </IconContainer>
        <ShippingAddressLabel>
          Home address
        </ShippingAddressLabel>
      </ShippingAddressCard>
    </Container>
  );
}
