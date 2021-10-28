import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../api/controller';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isAuth] = useState(auth().login);
  const [menus, setMenus] = useState([
    {
      name: 'home',
      link: '/',
    },
    {
      name: 'login',
      link: '/login',
    },
    {
      name: 'register',
      link: '/register',
    },
  ]);
  const sidebarButtonHandler = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (isAuth) {
      setMenus([
        { name: 'home', link: '/' },
        { name: 'new blog', link: '/create-blogs' },
        { name: 'logout', link: '/logout' },
      ]);
    }
  }, [auth]);

  const location = useLocation();
  return (
    <div className="Navbar bg-transparent w-full absolute top-0 z-40">
      <div className="navbar nav mx-12  py-4 sm:mx-18 lg:mx-32">
        <div className="flex py-0 sm:py-2">
          <h1 className={`font-poppins text-xl font-bold ${location.pathname === '/' ? 'hover:text-blue-50 text-white' : 'text-gray-600 hover:text-gray-500'} `}>
            <Link to={'/'}>PERN STACK</Link>
          </h1>
          <div className={` ${active ? 'ml-12' : 'ml-auto '} sm:hidden capitalize`} onClick={sidebarButtonHandler}>
            asdsad
          </div>
          <div className={`ml-auto sm:w-60 ${active ? 'right-0' : 'right-full'} sm:right-0  absolute sm:relative z-40 bg-black opacity-80 sm:bg-transparent top-0 px-24 sm:px-0 h-screen sm:h-auto`}>
            <ul className=" flex sm:flex-row flex-col h-80 pt-24 sm:h-auto sm:pt-0 justify-around">
              {menus.map((menu, index) => {
                return (
                  <li key={index} className={`font-poppins font-medium capitalize ${location.pathname === '/' ? 'hover:text-blue-50 text-white' : 'text-gray-600 hover:text-gray-500'}`}>
                    <Link to={menu.link}>{menu.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
