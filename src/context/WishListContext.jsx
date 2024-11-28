import axios from "axios";
import { createContext } from "react";

export let WishListContext=createContext();


export default function WishListContextProvider(props){

    let headers={token:localStorage.getItem('UserToken')}

    function addToWishList(productId){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function getLoggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function removeProductFromWishList(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
        .then((res)=>res)
        .then((err)=>err)
    }





    return <WishListContext.Provider value={{addToWishList,getLoggedUserWishList,removeProductFromWishList}}>
               {props.children}
    </WishListContext.Provider>
}


