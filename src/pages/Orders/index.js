import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {format, parseISO} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {dateLanguage} from '../../locales';

// import translate from '../../locales';

import OrderListPlaceholder from '../../components/Placeholders/OrderList';

import api from '../../services/api';

import Background from '../../components/Background';

import {
  Container,
  OrderList,
  Order,
  OrderInfo,
  OrderNumber,
  OrderDate,
  OrderStatusIcon,
  OrderStatusText,
  DetailsButton,
  DetailsText,
  NoOrders,
  AnimationContainer,
  EmptyBoxAnimation,
  NoOrdersTextContainer,
  NoOrdersText,
  NoOrdersSubText,
} from './styles';
import colors from '../../styles/colors';
import {useSelector} from "react-redux";

export default function Orders({navigation}) {
  const [orders, setOrders] = useState(null);
  const userId = useSelector(state => state.user.profile.id);
  
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders/'+userId);
      console.log(response);
      setOrders(
        response.data.map(order => ({
          ...order,
          dateFormatted: format(parseISO(order.date), 'PPPpp', {
            locale: dateLanguage,
          }),
        })),
      );
    }

    loadOrders();
  }, []);

  const statusProps = {
    in_progress: [
      'In progress',
      'arrow-down',
      colors.dark_blue,
    ],
    finished: [
      'Finished',
      'check-circle-outline',
      colors.success,
    ],
    cancelled: [
      'Canceled_status',
      'close-circle-outline',
      colors.failed,
    ],
  };

  const renderOrder = ({item}) => {
    return (
      <Order style={styles.boxShadow}>
        <OrderInfo>
          <OrderNumber>{`${'Order Nº'} ${
            item.id
            }`}</OrderNumber>
          <OrderDate>{`${'Placed in'} ${
            item.dateFormatted
            }`}</OrderDate>
        </OrderInfo>
        <OrderStatusIcon>
          <Icon
            name={statusProps[item.status][1]}
            color={statusProps[item.status][2]}
            size={60}
          />
        </OrderStatusIcon>
        <OrderStatusText>{statusProps[item.status][0]}</OrderStatusText>
        <DetailsButton
          onPress={() => navigation.navigate('OrderDetails', {order: item})}>
          <DetailsText>{'Details'}</DetailsText>
        </DetailsButton>
      </Order>
    );
  };

  function RenderList() {
    if (orders) {
      if (orders.length) {
        return (
          <OrderList
            data={orders}
            keyExtractor={order => String(order.id)}
            renderItem={renderOrder}
          />
        );
      }

      return (
        <NoOrders>
          <AnimationContainer>
            <EmptyBoxAnimation/>
          </AnimationContainer>
          <NoOrdersTextContainer>
            <NoOrdersText>{'You have no orders placed'}</NoOrdersText>
            <NoOrdersSubText>{'When you have orders, we will show you progress and status here.'}</NoOrdersSubText>
          </NoOrdersTextContainer>
        </NoOrders>
      );
    }
    return (
      <OrderList
        data={Array.from({length: 5}).map((u, i) => i)}
        keyExtractor={order => String(order)}
        renderItem={OrderListPlaceholder}
      />
    );
  }

  return (
    <Background>
      <Container>
        <RenderList/>
      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
