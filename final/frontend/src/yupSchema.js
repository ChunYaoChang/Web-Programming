import * as yup from 'yup';

const email = yup
  .string()
  .required('Email address is required.')
  .email('Please input a valid email address.');

const username = yup
  .string()
  .required("Username is required.")
  .matches(
    /^[a-zA-Z0-9_]*$/,
    'Username can only contain alphabet, number, and underscore (_).'
  )
  .matches(
    /^[a-zA-Z0-9_]{1,20}$/,
    'The length of username should be in [8, 20].'
  );

const password = yup
  .string()
  .required('Please input your password.')
  .matches(
    /^[!-~]{8,20}$/,
    'The length of password should be in [8, 20].'
  );

const nickname = yup
  .string()
  .max(20, 'Nickname should be less than or equal to 20 characters!');

const confirmPassword = yup
  .string()
  .required('Please confirm your password.')
  .oneOf(
    [yup.ref('password')],
    'Passwords are different!'
  );

const admin = yup
  .boolean();

const adminCode = yup
  .string()
  .max(20, 'Your admin code is too long!')
  .when(['admin'], { is: true, then: s => s.required('It is a required field!') });

const title = yup
  .string()
  .required('Title is required!')
  .max(15, 'Your title is too long!');

const description = yup
  .string()
  .max(100, 'Your description is too long!');

const participate = yup
  .boolean();

const startTime = yup
  .string()
  .required('Start time is required!');

const endTime = yup
  .string()
  .required('End time is required!');

const gameName = yup
  .string()
  .required('Game name is required!')
  .max(10, 'Game name is too long!');

const gameType = yup
  .string()
  .required('Game type is required!')
  .max(10, 'Game name is too long!');

const datetime = yup
  .string()
  .required('Date is required!');

const url = yup
  .string()
  .required('Youtube url is required!')
  .url('This is not a url!')
  .matches(
    // reference: https://www.codegrepper.com/code-examples/javascript/validation+url+youtube+video
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    'It seems it\'s not a Youtube url...?'
  );

const registerSchema = yup.object().shape({
  email,
  username,
  password,
  confirmPassword,
});

const loginSchema = yup.object().shape({
  username,
  password,
});

const settingSchema = yup.object().shape({
  username,
  email,
  nickname,
  admin,
  adminCode,
});

const activitySchema = yup.object().shape({
  title,
  description,
  startTime,
  endTime,
  participate,
});

const videoSchema = yup.object().shape({
  url,
  gameName,
  gameType,
  datetime,
  description,
});

export {
  registerSchema,
  loginSchema,
  settingSchema,
  activitySchema,
  videoSchema,
};
