import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function Categories() {
 
  const [SpecificCategory, setSpecificCategory] = useState([])
  const [nameOfCategory, setnameOfCategory] = useState('')
  async function getAllCategories(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data,isError,isFetching,isLoading,error}=useQuery({
    queryKey:["allCategories"],
    queryFn:getAllCategories,
  })

 if(isLoading){
  return <div className='flex justify-center items-center bg-slate-100 w-[100%]'><span className="loader"></span></div>
 }
  
  async function getSpecificCategory(id,name){
   
    await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    .then((res)=>{
         console.log(res.data.data);
         setSpecificCategory(res.data.data)
         setnameOfCategory(name)
    })
  }


   


  return (
    <>

      <div className='row mt-8'>
        {
          data?.data?.data.map(
            (product)=>{
                return<div onClick={()=>getSpecificCategory(product._id,product.name)} className='w-full mb-20 text-center  me-3  md:w-[30%]  hover:shadow-[0_0_10px_3px_rgba(59,130,246,.5)] transition-shadow duration-700 border border-black-600'  key={product._id}>
                       <img src={product.image} alt="" className='w-full h-[300px]'/>
                       <h2 className='my-8 text-lg text-green-500 font-bold'>{product.name}</h2>
                </div>
              
            }

          )
        }
        
      </div>

      
      
     
    {
      SpecificCategory.length>0?<div className='row gap-3'>
        <div className='w-[100%] text-center'>
          <h1 className='my-8 text-3xl text-green-500 font-bold'>{nameOfCategory} subcategories</h1>
        </div>
        {SpecificCategory.map((item,index)=>{
            return<h2 key={index} className='md:w-[30%] text-xl text-black font-bold border border-gray-400 justify-between  p-4 text-center hover:shadow-[0_0_10px_3px_rgba(59,130,246,.5)] transition-shadow duration-700'>{item.name}</h2>
            
        })}</div>:<div></div>
    }
    
    </>
  )
}
