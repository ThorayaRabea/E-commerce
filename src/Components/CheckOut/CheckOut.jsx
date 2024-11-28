import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'



export default function CheckOut() {
let {checkOut,cartId}=useContext(CartContext)
let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:()=>handleCheckOut(cartId,'http://localhost:5173'),
  })
 
   async function handleCheckOut(cartId,url){
    let {data} =await checkOut(cartId,url,formik.values)   
    console.log(data)   
    window.location.href= data.session.url
    }



/////////// Green Button///////
let GreenButton=()=>{
  return <button type="submit" className="text-white bg-blue-600 border border-gray-300 font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" >Login now</button>
}
/////////Disabled Button//////////////
let DisabledButton=()=>{
    return <button type="submit" className="text-gray-900 bg-white border border-gray-300  font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" disabled>Login now</button>
}



  return (
    <>
    <div className='container'>
      <h2 className='text-3xl font-semibold mb-6'>CheckOut Now</h2>
      <form className="max-w-full mx-auto" onSubmit={formik.handleSubmit}>

      
      <div className="mb-4">
          <label htmlFor="details" className="block mb-2 text-lg font-normal text-gray-900 ">details :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" id="details" name='details' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />
      </div>
      <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-lg font-normal text-gray-900 ">phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />
      </div>
      <div className="mb-4">
          <label htmlFor="city" className="block mb-2 text-lg font-normal text-gray-900 ">city :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300  text-sm rounded-lg  block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"  />
      </div>

<div className='flex gap-4 items-center'>
<button type="submit" className="text-gray-900 bg-white border border-gray-300  font-thin rounded-lg text-lg px-5 py-2.5 mb-2 block ms-auto" >CheckOut Now</button>
</div>
      
  {/* {Error()?DisabledButton(): GreenButton()} */}
  


    </form>
  </div>


    </>
  )
}
