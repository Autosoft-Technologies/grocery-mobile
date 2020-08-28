import * as Yup from 'yup';
import translate from '../../../locales';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default signInSchema;
