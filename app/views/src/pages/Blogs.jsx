import React, { useEffect } from 'react';
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

  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await getAllApi(`posts?limit=${limit}`);
      if (res.status === 'success') {
        setBlogs(res.posts);
        setLoading(false);
      }
    };
    getPosts();
  }, [limit]);

  const loadPostHandler = async (e) => {
    e.preventDefault();
    if (blogs.length > 9) {
      setLoading(true);
      setLimit(limit + 10);
    }
  };

  return (
    <div className="py-12 my-6">
      <div className="mx-4 lg:mx-8 xl:mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {loading ? <h1>Loading ...</h1> : ''}
          {blogs.map((blog, index) => {
            return (
              <div key={index}>
                <div>
                  <CardComponent blog={blog} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {blogs.length > 9 && (
        <div className="flex justify-center">
          <button onClick={loadPostHandler} className="px-4 py-2 rounded-lg text-black bg-blue-300 font-poppins font-medium text-base capitalize">
            {loading ? <h1>Please wait</h1> : <h1>Read More</h1>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
