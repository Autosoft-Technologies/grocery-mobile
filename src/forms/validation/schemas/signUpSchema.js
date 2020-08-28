import * as Yup from 'yup';
import translate from '../../../locales';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .test(
      'testPhone',
      'Phone is invalid',
      text =>
        text.replace(/\D/g, '').length === 10 ||
        text.replace(/\D/g, '').length === 11,
    )
    .required('Phone is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

export default signUpSchema;
