import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext()

export default function CartContextProvider(props){

     let headers={token:localStorage.getItem('UserToken')}
     const [cartId, setcartId] = useState('')
     
    function addProductsToCart(productId){
       return  axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:productId},
        { headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

   async function getLoggedUserCart(){
       return await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers})
        .then((res)=>{
            console.log(res.data.data._id)
            setcartId(res.data.data._id)
            allOrders(cartId)
            return res;
        })
        .catch((err)=>err)
    }

    function updateCartProductQuantity(productId,newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers})
         .then((res)=>res)
         .catch((err)=>err)
     }

     function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
         .catch((err)=>err)
     }


     function deleteUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>res)
         .catch((err)=>err)
     }
  
  
    function checkOut(cartId,url,formDetails){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:formDetails},{headers})
    .then((res)=>res)
        .catch((err)=>err)
    }

    function allOrders(cartId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`,{headers})
    .then((res)=>{
        console.log('hello')
        return res
    })
    .catch((err)=>err)
    }

useEffect(()=>{
    getLoggedUserCart()
},[])

    return <CartContext.Provider value={  {addProductsToCart,getLoggedUserCart,updateCartProductQuantity,deleteCartItem,deleteUserCart,checkOut,cartId,allOrders} }>
        {props.children}
    </CartContext.Provider>
}