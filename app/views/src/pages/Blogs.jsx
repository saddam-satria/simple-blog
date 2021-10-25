import React, { useEffect, Suspense } from 'react';
import CardComponent from '../components/CardComponent';
import { getAllApi } from '../api/fetch';

import { useState } from 'react';

// const convertMonth = (month) => {
//   switch (month) {
//     case 1:
//       return 'january';
//     case 2:
//       return 'february';
//     case 3:
//       return 'march';
//     case 4:
//       return 'april';
//     case 5:
//       return 'may';
//     case 6:
//       return 'june';
//     case 7:
//       return 'july';
//     case 8:
//       return 'august';
//     case 9:
//       return 'september';
//     case 10:
//       return 'october';
//     case 11:
//       return 'november';
//     case 12:
//       return 'december';
//     default:
//       return;
//   }
// };

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getPosts = async () => {
      const res = await getAllApi(`posts?limit=${limit}`);

      if (res.status === 'success') {
        setBlogs(res.posts);
      } else if (res.status === 'error') {
        setError(true);
      }
    };
    getPosts();
  }, [limit]);

  const loadPostHandler = async (e) => {
    e.preventDefault();
    if (blogs.length > 10) {
      setLimit(limit + 10);
    }
  };

  return (
    <div className="py-12 my-6">
      <div className="mx-4 lg:mx-8 xl:mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {error && <h4 className="text-red-600 font-medium text-2xl">Somethings Error</h4>}
          {blogs.map((blog, index) => {
            return (
              <Suspense fallback={<h4>Loading ...</h4>}>
                <div key={index}>
                  <div>
                    <CardComponent blog={blog} />
                  </div>
                </div>
              </Suspense>
            );
          })}
        </div>
      </div>
      {blogs > 10 && (
        <div className="flex justify-center">
          <button onClick={loadPostHandler} className="px-4 py-2 rounded-lg text-black bg-blue-300 font-poppins font-medium text-base capitalize">
            load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
