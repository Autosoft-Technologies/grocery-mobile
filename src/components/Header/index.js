import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import translate from '../../locales';

import { EmptyCart } from '../../store/modules/cart/actions';

import {
  Wrapper,
  LeftContainer,
  Logo,
  RightContainer,
  SearchButton,
  BasketButton,
  ItemCount,
  HeaderContainer,
  BackContainer,
  IconContainer,
  PageTitle,
} from './styles';

export default function Header({ navigation }) {
  const dispatch = useDispatch();
  const cartSize = useSelector(state => state.cart.length);

  const { routeName } = navigation.state;

  function handleEmptyCart() {
    dispatch(EmptyCart());
  }

  const HomeHeader = (
    <>
      <LeftContainer>
        <Icon
          name={'menu'}
          color="#fff"
          size={24}
          onPress={() => navigation.openDrawer()}
        />
        <Logo />
      </LeftContainer>
      <RightContainer>
        <SearchButton onPress={() => navigation.navigate('Search')}>
          <Icon name="magnify" color="#FFF" size={22} />
        </SearchButton>
        <BasketButton onPress={() => navigation.navigate('Cart')}>
          <Icon name="basket" color="#FFF" size={20} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketButton>
      </RightContainer>
    </>
  );

  const ProductDetailsHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Product details</PageTitle>
      </BackContainer>
      <BasketButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" color="#FFF" size={20} />
        <ItemCount>{cartSize || 0}</ItemCount>
      </BasketButton>
    </>
  );

  const ProductsByCategoryHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>{navigation.getParam('CategoryName')}</PageTitle>
      </BackContainer>
      <BasketButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" color="#FFF" size={20} />
        <ItemCount>{cartSize || 0}</ItemCount>
      </BasketButton>
    </>
  );

  const CartHeader = (
    <HeaderContainer>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Cart</PageTitle>
      </BackContainer>
      {cartSize > 0 && (
        <IconContainer onPress={handleEmptyCart}>
          <Icon name="delete" color="#FFF" size={20} />
        </IconContainer>
      )}
    </HeaderContainer>
  );

  const OffersHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Offers</PageTitle>
      </BackContainer>
      <BasketButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" color="#FFF" size={20} />
        <ItemCount>{cartSize || 0}</ItemCount>
      </BasketButton>
    </>
  );

  const OrdersHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>My orders</PageTitle>
      </BackContainer>
    </>
  );

  const MyAccountHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>My account</PageTitle>
      </BackContainer>
    </>
  );

  const ProfileHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Profile</PageTitle>
      </BackContainer>
    </>
  );

  const ShippingAddressHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Home address</PageTitle>
      </BackContainer>
    </>
  );

  const OrderDetailsHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Order details</PageTitle>
      </BackContainer>
    </>
  );

  const SearchHeader = (
    <>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Search</PageTitle>
      </BackContainer>
      <BasketButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" color="#FFF" size={20} />
        <ItemCount>{cartSize || 0}</ItemCount>
      </BasketButton>
    </>
  );

  const DeliveryAddressHeader = (
    <HeaderContainer>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Delivery address</PageTitle>
      </BackContainer>
    </HeaderContainer>
  );

  const PaymentMethodHeader = (
    <HeaderContainer>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Payment method</PageTitle>
      </BackContainer>
    </HeaderContainer>
  );

  const OrderConfirmationHeader = (
    <HeaderContainer>
      <BackContainer>
        <Icon
          name="arrow-left"
          color="#fff"
          size={22}
          onPress={() => navigation.goBack()}
        />
        <PageTitle>Order review</PageTitle>
      </BackContainer>
    </HeaderContainer>
  );

  const renderHeader = {
    Home: HomeHeader,
    Cart: CartHeader,
    Offers: OffersHeader,
    Orders: OrdersHeader,
    MyAccount: MyAccountHeader,
    Profile: ProfileHeader,
    ShippingAddress: ShippingAddressHeader,
    OrderDetails: OrderDetailsHeader,
    Search: SearchHeader,
    ProductDetails: ProductDetailsHeader,
    DeliveryAddress: DeliveryAddressHeader,
    PaymentMethod: PaymentMethodHeader,
    OrderConfirmation: OrderConfirmationHeader,
    ProductsByCategory: ProductsByCategoryHeader,
  };

  const noHeader = ['PaymentResult'];

  return noHeader.includes(routeName) ? null : (
    <Wrapper>{renderHeader[routeName]}</Wrapper>
  );
}
