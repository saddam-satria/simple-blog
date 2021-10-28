import React, { useState } from 'react';
import { protectedRouteAPI } from '../api/fetch';

const CreateBlogs = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const imageFile = e.target.image;
    const authorId = JSON.parse(localStorage.getItem('authorId'));

    try {
      if (authorId === null) {
        throw 'Anda belum menjadi author';
      }
      if (title.length < 1 || desc.length < 1 || imageFile.files.length < 1) {
        throw 'Please, Fill form';
      }

      let formData = new FormData();
      if (imageFile.files[0].type === 'image/jpeg' || imageFile.files[0].type === 'image/png' || imageFile.files[0].type === 'image/jpg') {
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('authorId', authorId);
        formData.append('image', imageFile.files[0]);
      } else {
        throw 'File must be an image';
      }

      const accessToken = JSON.parse(localStorage.getItem('accessToken'));
      const result = await protectedRouteAPI('posts', {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        body: formData,
      });

      if (result['status'] === 'error') {
        setError(true);
        throw result['msg'];
      }

      setError(false);
      setMessageStatus(result['msg']);

      setTitle('');
      setDesc('');
    } catch (error) {
      setError(true);
      setMessageStatus(error);
    }
  };

  return (
    <div className="py-12 my-6">
      <div className="mx-4 lg:mx-8 xl:mx-12">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 py-12">
            <form method="post" onSubmit={submitHandler}>
              <div className="flex flex-col w-full md:w-1/2 mx-auto">
                {messageStatus && <span className={`capitalize p-3 ${error ? 'bg-red-400 ' : 'bg-green-400'} text-white my-2 rounded-md font-poppins`}>{messageStatus}</span>}
                <label htmlFor="title" className="capitalize font-normal font-poppins">
                  title
                </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none" name="title" type="text" placeholder="title" />
                <label htmlFor="desc" className="capitalize font-normal font-poppins">
                  desc
                </label>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none" name="desc" cols="30" rows="10" placeholder="desc"></textarea>
                <input type="file" className="p-2 py-4 bg-blue-300 rounded-md my-4" name="image" />
                <div className="ml-auto">
                  <button type="submit" className="p-2 px-6 text-white capitalize rounded-md bg-blue-400">
                    create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogs;
