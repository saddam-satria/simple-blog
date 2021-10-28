import { useState, useCallback } from 'react';
import { protectedRouteAPI } from '../api/fetch';

const CreateAuthors = () => {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [messageStatus, setMessageStatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const authorId = JSON.parse(localStorage.getItem('authorId'));

    try {
      if (authorId !== null) {
        throw 'Anda sudah terdaftar menjadi author';
      }
      const result = await protectedRouteAPI('authors', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
        },
        body: JSON.stringify({
          username,
          city,
          country,
          userId: JSON.parse(localStorage.getItem('userActive')),
        }),
      });

      if (result['status'] === 'error') {
        throw result['msg'];
      }

      setError(false);
      setMessageStatus(result['msg']);
      localStorage.setItem('authorId', JSON.stringify(result.authorId));

      setUsername('');
      setCity('');
      setCountry('');
    } catch (error) {
      setError(true);
      setMessageStatus(error);
    }
  };
  return (
    <div className="py-12 my-6">
      <div className="w-full py-12 flex justify-center">
        <div className="w-full mx-12 xl:w-1/2 py-4">
          <form method="post" onSubmit={submitHandler}>
            <div className="flex flex-col w-full md:w-1/2 mx-auto">
              {messageStatus && <span className={`capitalize p-3 ${error ? 'bg-red-400 ' : 'bg-green-400'} text-white my-2 rounded-md font-poppins`}>{messageStatus}</span>}
              <label htmlFor="username" className="capitalize font-normal font-poppins">
                username
              </label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="firstname" type="text" placeholder="username" />
              <label htmlFor="city" className="capitalize font-normal font-poppins">
                city
              </label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="city" type="text" placeholder="city" />
              <label htmlFor="country" className="capitalize font-normal font-poppins">
                country
              </label>
              <input value={country} onChange={(e) => setCountry(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="country" type="text" placeholder="country" />
              <div className="ml-auto">
                <button type="submit" className="p-2 px-6 text-white capitalize rounded-md bg-blue-400">
                  Become Author
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuthors;
