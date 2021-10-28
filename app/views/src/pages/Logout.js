import React from 'react';

const Logout = () => {
  localStorage.clear()
  window.location.href = '/login';
};

export default Logout;
