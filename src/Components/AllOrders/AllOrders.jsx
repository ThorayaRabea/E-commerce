import axios, { all } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'

export default function AllOrders() {


    return (
        <>
    <h1 className='text-center font-bold text-6xl text-green-500 mb-4'>All Orders</h1>
    {/* <div >
            {
              Orders?.map(
                (product,index)=>{
                    return  <div  className=' mb-10 text-center  pt-6  hover:shadow-[0_0_10px_3px_rgba(59,130,246,.5)] transition-shadow duration-700 border border-black-600'  key={index} onClick={()=>getSpecificBrand(product._id)}>
                    <h2 className=' text-lg text-green-500 font-bold'>Name : {product.user.name}</h2>
                    <h2 className='my-3'>Email : {product.user.email}</h2>
                    <h2 className='my-3'>Total Price Order : {product.totalOrderPrice}</h2>
                    <h2 className='my-3'>Paid At : {product.paidAt}</h2>
                    
                    </div>
                
                }
    
              )
            }
            
          </div> */}
        </>
      )
}
