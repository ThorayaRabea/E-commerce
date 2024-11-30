import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useProsucts from '../../Hooks/useProsucts'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../context/WishListContext'
export default function Products() {

  let {addProductsToCart,setcartNumber,cartNumber}=useContext(CartContext)
   
  ///week 4 part 7
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)

  /////wishList///
  let {addToWishList}=useContext(WishListContext)
  const [wishListIds, setWishListIds] = useState([])

  async function addProductToWishList(id){
     let response = await addToWishList(id)
     //console.log(response);
     if(response.data.status=='success'){
      if (wishListIds.includes(id)) { 
        setWishListIds(wishListIds.filter((wishId) => wishId !== id))
        
      } else {
        setWishListIds([...wishListIds, id])
        localStorage.setItem('idOfWishList',wishListIds)
        toast.success(response.data.message,{
          position: 'top-right',
          style: {
            padding:'30px'
          },
        })
      }     
     }else{
      toast.error(response.data.message)
     }

     
  }
  /////////
  
  async function addToCart(id){
    setcurrentId(id)
    setloading(true)
     let respose= await addProductsToCart(id)
      // console.log(respose.data); 
      if(respose.data.status=='success') {
        setcartNumber(cartNumber+1)
           toast.success(respose.data.message,{
            position: 'top-right',
            style: {
              padding:'30px'
            },
           })
           setloading(false)
      } else{
        toast.error(respose.data.message)
        setloading(false)
      }
  }



  let {data,isError,error,isLoading}=useProsucts()
  
  if(isError){
    return <h3>{error}</h3>
  }
  if(isLoading){
    return <span className="loader"></span>
  }
  

  return (
    <>
       <div className="row mt-8">
         { data?.map( (product)=>{
            return <div className='w-full mb-20 px-3 product me-3 md:w-[30%] lg:w-[23%]' key={product.id}>
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt="" className='w-full' />
                <h3 className='text-green-500'>{product.category.name}</h3>
                <h3 className='font-bold mb-2'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className='flex justify-between mb-3'>
                    <h3>{product.price} EGP</h3>
                    <h3 ><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</h3>
                </div></Link>
                

                <div className='text-end ' onClick={()=>addProductToWishList(product.id)}>{wishListIds.includes(product.id)?<i className='fas fa-heart text-3xl cursor-pointer text-red-700' ></i>:<i className='fas fa-heart text-3xl cursor-pointer' ></i>}</div>
                
                <div className='text-center mb-3 ' onClick={  ()=>addToCart(product.id) }>
                    <button className='w-[80%] bg-green-600 rounded-lg text-white btn py-1 '> {
                      loading && currentId==product.id ?(<i className='fas fa-spinner fa-spin'></i>):(" + Add")}</button>
                </div>
                
            </div>
         } ) }
         
       </div>
    </>
  )






}
