import { checkUserId } from '../axios';

const checkLogin = async (cookies) => {
  if (cookies.userId) {
    const result = await checkUserId(cookies.userId);
    if (result === 'success') {
      // pass to useAsync()
      return { status: true };
    }
  }
  // pass to useAsync()
  return { status: false };
};

const logout = (cookies, removeCookie) => {
  if (cookies.userId) {
    removeCookie('userId');
  }
}

const validLoginStatus = (status) => {
  // moduled for easy modification in the future
  return (status === 'success');
};

const register = (data) => {
  console.log(data);

};

export {
  checkLogin,
  logout,
  validLoginStatus,
  register,
};
