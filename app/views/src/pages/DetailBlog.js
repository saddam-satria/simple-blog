import { useEffect, useState } from 'react';
import { getAllApi } from '../api/fetch';
import { BASE_URL_IMAGE } from '../api/config';

const DetailBlog = ({ match }) => {
  const { id } = match.params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const detailBlog = async () => {
      const res = await getAllApi(`post/${id}`);

      if (res.status === 'success') {
        setBlog(res.postInfo);
      }
    };

    detailBlog();
  }, [id]);

  return (
    <div className="py-12 my-6">
      {blog !== null && (
        <div className="container mx-auto">
          <img className="object-cover h-80 w-full mb-4" src={BASE_URL_IMAGE + 'blogs/' + blog.image} alt="" />
          <h1 className="text-2xl font-poppins font-bold capitalize">{blog.title}</h1>
          <h3 className="text-xl font-poppins font-medium capitalize py-4">{blog.Author.username}</h3>
          <p className="text-justify font-poppins text-lg font-normal "> {blog.desc}</p>
        </div>
      )}
    </div>
  );
};

export default DetailBlog;
