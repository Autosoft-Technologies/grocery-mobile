import validate from 'card-validator';
import * as Yup from 'yup';
import translate from '../../../locales';

const addCardSchema = Yup.object().shape({
  expirationDate: Yup.string()
    .test(
      'testExpirationDate',
      'Expiration date is invalid',
      text => validate.expirationDate(text).isValid,
    )
    .required('Expiration date is required'),
  number: Yup.string()
    .test(
      'testNumber',
      'Credit card number is invalid',
      text => validate.number(text.replace(/\D/g, '')).isValid,
    )
    .required('Credit card number is required'),
  nameOnCard: Yup.string().required('Name on card is required'),
  cvv: Yup.string()
    .test(
      'testCVV',
      'CVV is invalid',
      text => text.length >= 3 && text.length <= 4,
    )
    .required('CVV is required'),
});

export default addCardSchema;
