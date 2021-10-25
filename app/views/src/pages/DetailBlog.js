import { useEffect, useState } from 'react';
import { getAllApi } from '../api/fetch';
import { BASE_URL_IMAGE } from '../api/config';

const DetailBlog = ({ match }) => {
  const { id } = match.params;
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const detailBlog = async () => {
      const res = await getAllApi(`post/${id}`);

      if (res.status === 'success') {
        setBlog(res.postInfo);
      } else if (res.status === 'error') {
        setError(true);
      }
    };

    detailBlog();
  }, [id]);

  console.log(blog);
  return (
    <div className="py-12 my-6">
      <div className="container mx-auto">
       {blog &&  <img className="object-cover h-80 w-full " src={BASE_URL_IMAGE  + 'blogs/' + blog.image} alt="" />}
      </div>
    </div>
  );
};

export default DetailBlog;
