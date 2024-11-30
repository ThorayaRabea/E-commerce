import axios, { all } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'

export default function AllOrders() {
  let {allOrders,cartId}=useContext(CartContext)
  const [userOrders, setuserOrders] = useState([])
 async function getAllOrders(){
   let res=await allOrders(cartId)
   console.log(res.data.data);
   setuserOrders(res.data.data)
  }

  useEffect(()=>{
    getAllOrders()
  },[])

    return (
        <>
    <h1 className='text-center font-bold text-6xl text-gray-500 mb-4'>All Orders</h1>
    <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
              userOrders?.map(
                (product,index)=>{
                    return  <div  className=' mb-10 text-center  pt-6  hover:shadow-[0_0_10px_3px_rgba(59,130,246,.5)] transition-shadow duration-700 border border-black-600'  key={index}>
                    <h2 className=' text-lg text-green-500 font-bold'>Name : {product.user.name}</h2>
                    <h2 className='my-3'>Email : {product.user.email}</h2>
                    <h2 className='my-3'>Phone : {product.user.phone}</h2>
                    <h2 className='my-3'>Total Price : {product.totalOrderPrice}</h2>
                    <h2 className='my-3'>Date : {product.createdAt.split('T').slice(0,1)}</h2>
                    
                    </div>
                
                }
    
              )
            }
            
          </div>
        </>
      )
}
