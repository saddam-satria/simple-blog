import { useState } from 'react';

import { postCallApi } from '../api/fetch';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const target = e.target;
    const data = {
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const result = await postCallApi('user/login', data);
      if ('status' in result) {
        if (result['status'] === 'error') {
          throw result['msg'];
        }
        // create token auth
        const refreshToken = result.refreshToken.token;
        const accessToken = result.accessToken.token;
        const { msg } = result;

        setError(false);
        setMessageStatus(msg);
      }
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
              <label htmlFor="email" className="capitalize font-normal font-poppins">
                email
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none" name="email" type="email" placeholder="email" />
              <label htmlFor="password" className="capitalize font-normal font-poppins">
                password
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 my-4 bg-blue-50 rounded-md focus:outline-none" name="password" type="password" placeholder="password" />
              <div className="ml-auto">
                <button type="submit" className="p-2 px-6 text-white capitalize rounded-md bg-blue-400">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
