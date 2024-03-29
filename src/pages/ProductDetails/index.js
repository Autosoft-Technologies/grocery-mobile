import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import translate from '../../locales';

import Background from '../../components/Background';

import { addToCartRequest } from '../../store/modules/cart/actions';

import {
  Container,
  ProductImageContainer,
  ProductImage,
  ProductDetailsContainer,
  ProductTitle,
  ProductInfo,
  ProductDescription,
  ProductDescriptionText,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

export default function ProductDetails({ navigation }) {
  const productDetails = navigation.getParam('product');

  const dispatch = useDispatch();

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {}),
  );

  function handleAddProduct(product) {
    dispatch(addToCartRequest(product));
  }

  console.log(productDetails);
  return (
    <Background>
      <Container>
        <ProductImageContainer>
          <ProductImage
            source={{
              uri: productDetails.image.url,
            }}
          />
        </ProductImageContainer>
        <ProductDetailsContainer>
          <ProductTitle>{productDetails.name}</ProductTitle>
          <ProductInfo>{`${productDetails.priceFormatted}/${productDetails.quantity} ${productDetails.unit}`}</ProductInfo>
        </ProductDetailsContainer>
        <ProductDescription>
          <ProductDescriptionText>
            {productDetails.description}
          </ProductDescriptionText>
        </ProductDescription>
        <AddButton onPress={() => handleAddProduct(productDetails)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={18} />
            <ProductAmountText>
              {amount[productDetails.id] || 0}
            </ProductAmountText>
          </ProductAmount>
          <AddButtonText>{'Add'}</AddButtonText>
        </AddButton>
      </Container>
    </Background>
  );
}
