import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


export default function Brands() {
  
 async function getAllBrands(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data,isLoading}=useQuery({
    queryKey:['allBrands'],
    queryFn:getAllBrands,
  })
  
  if(isLoading){
    return <div className='flex justify-center items-center bg-slate-100'><span className="loader"></span></div>
  }


async function getSpecificBrand(id){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
       //console.log(res.data.data); 
//////////////////////////////////////////////////
  
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col`}
      >
        {/* زر X في الأعلى على اليسار */}
        <div className="flex items-center justify-end p-2 border-b border-gray-300">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-500 hover:text-gray-800"
          >
            &#x2715;
          </button>
        </div>
        
        {/* الصورة والعنوان */}
        <div className="flex items-center p-4 border-b border-gray-300">

          {/* العنوان */}
          <h2 className="text-xl font-semibold text-green-400 flex-1">
            {res.data.data.name}
          </h2>

          {/* الصورة */}
          <img
            src={res.data.data.image}
            alt="Placeholder"
            className="w-[70%] rounded-full "
          />
          
        </div>

        {/* زر الإغلاق */}
        <div className="p-2 flex justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className=" bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    ));


/////////////////////////////////////////////     
    })
}


  

  
 

  return (
    <>
<h1 className='text-center font-bold text-6xl text-green-500'>All Brands</h1>
<div className='row mt-8 gap-4'>
        {
          data?.data?.data.map(
            (product,index)=>{
                return  <div  className=' mb-20 text-center   md:w-[23%]  hover:shadow-[0_0_10px_3px_rgba(59,130,246,.5)] transition-shadow duration-700 border border-black-600'  key={index} onClick={()=>getSpecificBrand(product._id)}>
                       <img src={product.image} alt="" className='w-full h-[300px]'/>
                       <h2 className='my-8 text-lg text-green-500 font-bold'>{product.name}</h2>
                </div>
            
            }

          )
        }
        
      </div>


    
    </>
  )
}
