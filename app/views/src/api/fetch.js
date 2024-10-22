import { BASE_URL } from './config';

// Simple fetch api method get
const getAllApi = async (params) => {
  const res = await fetch(BASE_URL + params, {
    method: 'GET',
  });
  if (res.status === 404) {
    return { status: 'error', msg: 'Api Blocked ' };
  }
  const allData = await res.json();
  return allData;
};

// Simple fetch api method post

const postCallApi = async (params, data) => {
  const res = await fetch(BASE_URL + params, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const feedback = res.json();
  return feedback;
};

const protectedRouteAPI = async (params, option = {}) => {
  const res = await fetch(BASE_URL + params, option);
  const result = await res.json();

  return result;
};

export { getAllApi, postCallApi, protectedRouteAPI };
