import { BASE_URL } from './config';

// Simple fetch api method get
const getAllApi = async (params) => {
  const res = await fetch(BASE_URL + params);
  if (res.status === 404) {
    return { status: 'error', msg: 'Api Blocked ' };
  }
  const allData = await res.json();
  console.log(allData);
  return allData;
};

// Simple fetch api method post

const postCallApi = async (params, data) => {
  const res = await fetch(BASE_URL + params, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: data,
  });

  const feedback = res.json();
  return feedback;
};

export { getAllApi, postCallApi };
