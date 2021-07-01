import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : 'localhost:5000/api/';
const instance = axios.create({ baseURL });

const login = async (username, password) => {
  try {
    const res = await instance.post('/login', { username, password });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return 'internal server error';
  }
};

const register = async (data) => {
  // data: { username: ..., password: ..., ... }
  try {
    const res = await instance.post('/register', data);
    console.log(res.data);
    // 'duplicate', 'error', 'success'
    return res.data;
  } catch (e) {
    console.log(e);
    return 'internal server error';
  }
};

const checkUserId = async (userId) => {
  try {
    const res = await instance.post('/checkUserId', { userId });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return 'internal server error';
  }
};

const submitSetting = async (data) => {
  try {
    const res = await instance.post('/submitSetting', data);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return 'internal server error';
  }
};

export {
  login,
  register,
  checkUserId,
  submitSetting,
};
