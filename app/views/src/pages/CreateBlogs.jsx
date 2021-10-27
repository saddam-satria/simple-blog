import React from 'react';

const CreateBlogs = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target.title);
  };

  return (
    <div className="py-12 my-6">
      <div className="mx-4 lg:mx-8 xl:mx-12">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 py-12">
            <form method="post" onSubmit={submitHandler}>
              <div className="flex flex-col w-full md:w-1/2 mx-auto">
                <span className="p-3 text-white bg-red-400 my-2 rounded-md font-poppins">Error</span>
                <label htmlFor="title" className="capitalize font-normal font-poppins">
                  title
                </label>
                <input className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none" name="title" type="text" placeholder="title" />
                <label htmlFor="desc" className="capitalize font-normal font-poppins">
                  desc
                </label>
                <textarea name="desc" className="p-3 bg-blue-50 rounded-md my-4 focus:outline-none" name="desc" cols="30" rows="10" placeholder="desc"></textarea>
                <input type="file" className="p-2 py-4 bg-blue-300 rounded-md my-4" />
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
