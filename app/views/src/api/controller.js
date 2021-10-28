const login = (token) => {
  if ('refreshToken' in token && 'accessToken' in token && 'user' in token) {
    const { refreshToken, accessToken, user } = token;

    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
    localStorage.setItem('userActive', JSON.stringify(user));
  }
  return { status: 'error' };
};

const auth = () => {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  if (ACCESS_TOKEN === null) {
    return { status: 'error', msg: 'no token,', login: false };
  }
  return { accessToken: JSON.parse(ACCESS_TOKEN), login: true };
};

export { login, auth };
