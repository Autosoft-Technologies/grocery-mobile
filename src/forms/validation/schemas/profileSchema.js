import * as Yup from 'yup';
import translate from '../../../locales';

const profileSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Enter a valid email'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'Password must be at least 6 characters')
          .required('New password is required')
      : field,
  ),
  passwordConfirmation: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf(
            [Yup.ref('password')],
            'Passwords do not match',
          )
          .required('Password confirmation is required')
      : field,
  ),
});

export default profileSchema;
