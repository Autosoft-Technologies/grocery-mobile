import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import translate, { dateLanguage } from '../../locales';

import { formatPrice } from '../../util/format';

import Background from '../../components/Background';

import Table from '../../components/Table';

import {
  Container,
  OrderDetailsContainer,
  OrderInfo,
  OrderInfoLabelContainer,
  OrderInfoLabel,
  OrderInfoContentContainer,
  OrderInfoContent,
  PaymentMethod,
  PaymentMethodLabelContainer,
  PaymentMethodLabel,
  PaymentMethodContentContainer,
  PaymentMethodContent,
  ShippingAddress,
  ShippingAddressLabelContainer,
  ShippingAddressLabel,
  ShippingAddressContentContainer,
  ShippingAddressContent,
  CartDetails,
  TableTitle,
} from './styles';

export default function OrderDetails({ navigation }) {
  const [tableData, setTableData] = useState({});
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const orderDetailsFormatted = {
      ...navigation.getParam('order'),
      dateFormatted: format(
        parseISO(navigation.getParam('order').date),
        'PPPpp',
        { locale: dateLanguage },
      ),
    };

    setOrderDetails(orderDetailsFormatted);

    const tableHeader = [
      'Product',
      'Content',
      'Qty',
      'Price',
    ];

    const tableRows = orderDetailsFormatted.order_details.map(order => [
      order.product.name,
      `${order.product.quantity} ${order.product.unit}`,
      order.quantity,
      formatPrice(order.total),
    ]);

    setTableData({ tableHeader, tableRows });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentMethod = {
    credit_card: 'Credit card',
    cash: 'Cash',
  };

  return (
    <Background>
      <Container>
        <OrderDetailsContainer>
          <OrderInfo>
            <OrderInfoLabelContainer>
              <OrderInfoLabel>
                {'Order details'}
              </OrderInfoLabel>
            </OrderInfoLabelContainer>
            <OrderInfoContentContainer>
              <OrderInfoContent>{`${'Order Nº'} ${
                orderDetails.id
              }\n${'Placed in'} ${
                orderDetails.dateFormatted
              }`}</OrderInfoContent>
            </OrderInfoContentContainer>
          </OrderInfo>
          <PaymentMethod>
            <PaymentMethodLabelContainer>
              <PaymentMethodLabel>
                {'Payment method'}
              </PaymentMethodLabel>
            </PaymentMethodLabelContainer>
            <PaymentMethodContentContainer>
              <PaymentMethodContent>
                {paymentMethod[orderDetails.payment_method]}
              </PaymentMethodContent>
            </PaymentMethodContentContainer>
          </PaymentMethod>
          <ShippingAddress>
            <ShippingAddressLabelContainer>
              <ShippingAddressLabel>
                {'Delivery address'}
              </ShippingAddressLabel>
            </ShippingAddressLabelContainer>
            <ShippingAddressContentContainer>
              <ShippingAddressContent>{`${'Address'}: ${orderDetails.ship_street}, - ${orderDetails.ship_city}`}</ShippingAddressContent>
            </ShippingAddressContentContainer>
          </ShippingAddress>
        </OrderDetailsContainer>
        <CartDetails>
          <TableTitle>{'Items'}</TableTitle>
          <Table header={tableData.tableHeader} rows={tableData.tableRows} />
        </CartDetails>
      </Container>
    </Background>
  );
}
