import React, { useState } from 'react';
import { postCallApi } from '../api/fetch';
import { login } from '../api/controller';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastaname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const target = e.target;
    const data = {
      firstname: target.firstname.value,
      lastname: target.lastname.value,
      email: target.email.value,
      password: target.password.value,
    };
    try {
      if (firstname.length < 1 || lastname.length < 1 || email.length < 1 || password.length < 1) {
        throw 'Please, Fill the form';
      }

      if (password.length < 9) {
        throw 'Please, Fill the form';
      }

      const result = await postCallApi('users', data);
      if ('status' in result) {
        if (result['status'] === 'error') {
          throw result['msg'];
        }
      }
      setError(false);
      setMessageStatus(result['msg']);

      const refreshToken = result.refreshToken.token;
      const accessToken = result.accessToken.token;
      const user = result.userId
      login({ refreshToken, accessToken , user});
      window.location.href = '/';
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
              <label htmlFor="firstname" className="capitalize font-normal font-poppins">
                firstname
              </label>
              <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="firstname" type="text" placeholder="firstname" />
              <label htmlFor="lastname" className="capitalize font-normal font-poppins">
                lastname
              </label>
              <input value={lastname} onChange={(e) => setLastaname(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="lastname" type="text" placeholder="lastname" />
              <label htmlFor="email" className="capitalize font-normal font-poppins">
                email
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none font-poppins" name="email" type="email" placeholder="email" />
              <label htmlFor="password" className="capitalize font-normal font-poppins">
                password
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 my-4 bg-blue-50 rounded-md focus:outline-none font-poppins" name="password" type="password" placeholder="password" />
              <div className="ml-auto">
                <button type="submit" className="p-2 px-6 text-white capitalize rounded-md bg-blue-400">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
