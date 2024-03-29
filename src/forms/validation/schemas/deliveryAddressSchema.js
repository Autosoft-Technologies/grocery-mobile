import * as Yup from 'yup';

import translate from '../../../locales';

const deliveryAddressSchema = Yup.object().shape({
  addressee: Yup.string().required('Addressee name is required'),
  // postal_code: Yup.string()
  //   .test(
  //     'testPostalCode',
  //     translate('zipcode_error_1'),
  //     text => text.replace(/\D/g, '').length === 8,
  //   )
  //   .required(translate('zipcode_error_2')),
  street: Yup.string().required('Street is required'),
  // street_n: Yup.string().required(translate('street_n_error')),
  // neighborhood: Yup.string().required(translate('neighborhood_error')),
  city: Yup.string().required('City is required'),
  // state: Yup.string().required(translate('state_error')),
});

export default deliveryAddressSchema;
