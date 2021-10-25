import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Notfound = () => {
  const router = useHistory();

  const backToHome = () => {
    router.push('/');
  };
  return (
    <div className="w-full flex justify-center py-24">
      <div className="flex flex-col">
        <h3 className="font-poppins text-3xl uppercase font-medium">404 page not found</h3>
        <div className="my-12">
          <button onClick={backToHome} className="capitalize font-poppins font-normal text-blue-900 hover:text-blue-800">
            <FaArrowLeft /> back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
