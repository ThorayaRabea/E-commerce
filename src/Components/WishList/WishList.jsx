import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../context/WishListContext'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {

  let {getLoggedUserWishList,removeProductFromWishList}=useContext(WishListContext)
  let [listOfProducts, setlistOfProducts] = useState([])
  const [loading, setLoading] = useState({});

  let {addProductsToCart,setcartNumber,cartNumber}=useContext(CartContext)
  const [currentId, setcurrentId] = useState(0)
  const [loadingCart, setloadingCart] = useState(false)


  async function getWishListProduct(){
    const response =await getLoggedUserWishList();
     //console.log(response);
    if(response.data.status=="success"){
        setlistOfProducts(response.data.data)
    }
    
  }

  async function deleteItem(idOfProduct) {
    setLoading((prev) => ({ ...prev, [idOfProduct]: true }))
    let response= await removeProductFromWishList(idOfProduct)
    if(response.data.status=="success"){
      setcartNumber(cartNumber-1)
      setlistOfProducts(response.data.data)
    }
    setLoading((prev) => ({ ...prev, [idOfProduct]: false }))
    //console.log(listOfProducts)
  }

  async function addToCart(id){
    setcurrentId(id)
    setloadingCart(true)
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
           setloadingCart(false)
      } else{
        toast.error(respose.data.message)
        setloadingCart(false)
      }
  }


useEffect(()=>{
    getWishListProduct()
},[])
  

return (
<>

  <div className='container mx-auto bg-slate-100 p-8'>

  <div className='flex justify-between '>
    <h2 className='font-semibold text-2xl text-green-500'>My wishList</h2>
  </div>

  <div className=" overflow-x-auto  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  
    <tbody>
      {listOfProducts?.map((product,index)=>{
        return <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
        </td>
        <td>
          <div className="px-6 pb-2 font-semibold text-gray-900 dark:text-white">
            {product.title?.split(" ").slice(0, 2).join(" ")}
          </div>
          <div className="px-6 pb-2 font-semibold text-gray-900 dark:text-white">
            {product.price} EGP
          </div>
          <div className="px-6 py-2">
            <a onClick={() => deleteItem(product.id)} href="#" className="text-red-600 dark:text-red-500 flex items-center">
            {loading[product.id] ? (
                <i className="fa-solid fa-spinner fa-spin text-sm"></i>
              ) : (
                <i className="fa-solid fa-trash text-sm"></i>
              )}
              <span className="ms-3">{loading[product.id] ? "Removing..." : "Remove"}</span>
            </a>
          </div>
        </td>
        <td>
          <div className='text-center mb-3 ' onClick={  ()=>addToCart(product.id) }>
                    <button className='w-[80%] bg-green-600 rounded-lg text-white btn py-1 '> {
                      loadingCart && currentId==product.id ?(<i className='fas fa-spinner fa-spin'></i>):(" + Add to Cart")}</button>
            </div>
        </td>
      </tr>
      
      })}

    

    </tbody>
  </table>
  </div>


  </div>     


</>   
)
}
