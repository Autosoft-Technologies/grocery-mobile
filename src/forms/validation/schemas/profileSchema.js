import * as Yup from 'yup';
import translate from '../../../locales';

const profileSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(translate('email_error_1')),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, translate('new_password_error_1'))
          .required(translate('new_password_error_2'))
      : field,
  ),
  passwordConfirmation: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf(
            [Yup.ref('password')],
            translate('password_confirmation_error_1'),
          )
          .required(translate('password_confirmation_error_2'))
      : field,
  ),
});

export default profileSchema;
