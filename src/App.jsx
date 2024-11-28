import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Orders from './Components/Orders/Orders'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './context/CartContext'
import  { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './context/WishListContext'
import CheckOut from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'

let querry=new QueryClient()
function App() {
  const router=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'productdetails/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'orders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'register',element:<Register/>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={querry}>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster/>
            </CartContextProvider>
            <ReactQueryDevtools />
          </WishListContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
        
    </>
  )
}

export default App
