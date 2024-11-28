import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function Navbar() {
  let{UserLogin,setUserLogin}=useContext(UserContext)
  let navigate=useNavigate()
  function SignOut(){
    localStorage.removeItem("UserToken")
    setUserLogin(null)
    navigate('/login')
  }
  return (
    <>
       

<nav className="bg-slate-100 border-gray-100 fixed top-0 left-0 right-0 py-2">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
        <i className="fa-solid fa-cart-shopping text-green-500 text-3xl " ></i>
            <span className="self-center text-lg font-semibold whitespace-nowrap  ">Fresh Cart</span>
        </Link>

        {
          UserLogin!=null?(<ul className='flex gap-4 '>
            <li><Link  to={''}>Home</Link></li>
            <li><Link  to={'cart'}>Cart</Link></li>
            <li><Link  to={'wishlist'}>Wish List</Link></li>
            <li><Link  to={'products'}>Products</Link></li>
            <li><Link  to={'categories'}>Categories</Link></li>
            <li><Link  to={'brands'}>Brands</Link></li>    
          </ul>):(null)
        }

        
        

        <div className="flex items-center space-x-6 rtl:space-x-reverse">

          {UserLogin!=null?(<><Link to={'cart'} className='relative self-start'>
               <div className='w-5 h-5 bg-green-600 rounded-lg text-white flex justify-center items-center'><h3>0</h3></div>
              <i className="fa-solid fa-cart-shopping text-2xl absolute top-4 -left-2"></i>
            </Link>
            <span  className="text-lg cursor-pointer" onClick={SignOut}>SignOut</span> </>):(<><Link to={'login'} className="text-lg ">Login</Link>
            <Link to={'register'} className="text-lg ">Register</Link></>)
          }
            
            
        </div>
    </div>
</nav>

    </>
  )
}
