import storage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  return persistReducer(
    {
      key: 'grocery',
      storage,
      whitelist: ['auth', 'user', 'cart'],
    },
    reducers,
  );
};
