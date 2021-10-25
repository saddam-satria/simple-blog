import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Notfound = () => {
  const router = useHistory();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div className="w-full flex justify-center py-24">
      <div>
        <h3 className="font-poppins text-3xl uppercase font-medium">404 page not found</h3>
      </div>
    </div>
  );
};

export default Notfound;
