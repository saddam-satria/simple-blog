import { Link } from 'react-router-dom';
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="h-screen w-full bg-black opacity-60 z-10 "></div>
      <div className="absolute z-10  w-full items-center top-0 h-3/4 flex flex-col justify-center">
        <h1 className="text-white text-5xl font-bold text-left capitalize">Simple away blogs</h1>
        <div className="w-3/4 xl:w-1/2 py-8">
          <h4 className="text-white font-medium lowercase text-center text-xl font-poppins">Ready for being part of us, start writing blogs or reading blogs.</h4>
        </div>
        <div className="pt-4 pb-12 flex flex-row">
          <Fa.FaNodeJs className="text-5xl text-white " />
          <Fa.FaReact className="text-5xl mx-4 text-white animate-spin" />
          <Si.SiRedis className="text-5xl mr-4 text-white " />
          <Si.SiPostgresql className="text-5xl text-white " />
        </div>
        <div className="p-4">
          <Link to={'/blogs'} className="px-6 py-4 capitalize font-poppins hover:bg-red-600 bg-red-700 rounded-md  text-white">
            Start reading
          </Link>
          <Link to={'/create-authors'} className="px-6 py-4 capitalize font-poppins hover:bg-blue-600 bg-blue-700 rounded-md mx-4 text-white">
            Become an authors
          </Link>
        </div>
      </div>
      <img className="w-full h-full object-cover absolute z-0" src="https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=1080&w=1080" alt="background " />
    </div>
  );
};

export default Home;
