import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from '../api/config';

const CardComponent = ({ blog }) => {
  const desc = blog.desc.slice(0, 100);

  return (
    <div className="Card">
      <div className="w-full h-full flex justify-center">
        <div className="bg-white w-12/12 rounded-md">
          <div className="card-image w-full">
            <img className="object-cover w-full h-80 rounded-t-md" src={BASE_URL_IMAGE + 'blogs/' + blog.image} alt="card component" />
          </div>
          <div className="card-body py-4">
            <h1 className="font-poppins uppercase font-medium text-2xl">{blog.title}</h1>
            <div className="flex py-2">
              <h3 className="font-poppins capitalize font-medium text-lg">{blog.author}</h3>
              <div className="ml-auto">
                <span>{blog.create}</span>
              </div>
            </div>
            <p className="text-justify font-poppins text-lg font-normal ">
              {desc}{' '}
              <Link to={`blog/${blog.id}`} className="text-gray-500 font-poppins font-normal">
                read more ...
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
