

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  const { UserLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // حالة القائمة
  let {setcartNumber,cartNumber}=useContext(CartContext)
  function SignOut() {
    localStorage.removeItem("UserToken");
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-slate-100 border-gray-100 fixed top-0 left-0 right-0 py-2">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <i className="fa-solid fa-cart-shopping text-green-500 text-3xl"></i>
            <span className="self-center text-lg font-semibold whitespace-nowrap">Fresh Cart</span>
          </Link>

          {/* Toggler */}
          <button
            className="md:hidden text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* قائمة الروابط في الشاشات الكبيرة */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            {UserLogin ? (
              <ul className="flex gap-4 md:items-center text-center">
                <li>
                  <Link to={''}>Home</Link>
                </li>
                <li>
                  <Link to={'cart'}>Cart</Link>
                </li>
                <li>
                  <Link to={'wishlist'}>Wish List</Link>
                </li>
                <li>
                  <Link to={'products'}>Products</Link>
                </li>
                <li>
                  <Link to={'categories'}>Categories</Link>
                </li>
                <li>
                  <Link to={'brands'}>Brands</Link>
                </li>
              </ul>
            ) : null}
          </div>

          {/* أيقونة العربة مع زر تسجيل الخروج في الشاشات الكبيرة */}
          <div className="hidden md:flex items-center space-x-4">
            {UserLogin ? (
              <>
                <span className="text-lg cursor-pointer flex items-center" onClick={SignOut}>
                  SignOut
                </span>
                <Link to={'cart'} className="relative flex items-center">
                  <div className="w-5 h-5 bg-green-600 rounded-full text-white flex justify-center items-center">
                    {cartNumber}
                  </div>
                  <i className="fa-solid fa-cart-shopping text-2xl absolute top-[80%] -left-2"></i>
                </Link>
              </>
            ) : (
              <>
                <Link to={'login'} className="text-lg">
                  Login
                </Link>
                <Link to={'register'} className="text-lg">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* قائمة الروابط داخل الـ toggler للشاشات الصغيرة */}
        {menuOpen && (
          <div className="md:hidden bg-white w-full p-4">
            <ul className="flex flex-col gap-4 items-center">
              {UserLogin ? (
                <>
                  <li>
                    <Link to={''}>Home</Link>
                  </li>
                  <li>
                    <Link to={'cart'} className="flex items-center">
                      
                      <span className="ml-2">Cart</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'wishlist'}>Wish List</Link>
                  </li>
                  <li>
                    <Link to={'products'}>Products</Link>
                  </li>
                  <li>
                    <Link to={'categories'}>Categories</Link>
                  </li>
                  <li>
                    <Link to={'brands'}>Brands</Link>
                  </li>
                  <li>
                    <span className="text-lg cursor-pointer flex flex-col items-center" onClick={SignOut}>
                      SignOut
                    </span>
                    <Link to={'cart'} className="relative flex items-center ms-4">
                      <div className="w-5 h-5 bg-green-600 rounded-full text-white flex justify-center items-center ">
                       {cartNumber}
                      </div>
                      <i className="fa-solid fa-cart-shopping text-2xl absolute top-4 -left-2"></i>
                    </Link>

                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={'login'} className="text-lg">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={'register'} className="text-lg">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}