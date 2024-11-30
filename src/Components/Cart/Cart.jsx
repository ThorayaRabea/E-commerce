import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let {getLoggedUserCart,updateCartProductQuantity,deleteCartItem,deleteUserCart,setcartNumber,cartNumber}=useContext(CartContext)

  const [CartDetails,setCartDetails]=useState(null)
  const [loading, setLoading] = useState({});

 async function getCartItems(){
  let response= await getLoggedUserCart()
  if(response.data.status=='success'){
    setCartDetails(response.data.data)
    console.log(response.data.data)  
  }
  }

  async function updateProduct(id,count){
    if(count==0){
      deleteItem(id)
    }else{
      let response= await updateCartProductQuantity(id,count)
      if(response.data?.status=='success'){
        setCartDetails(response.data.data)  
        console.log(CartDetails);
        
      }
    }
  }


  async function deleteItem(id){
    setLoading((prev) => ({ ...prev, [id]: true }))
    let response= await deleteCartItem(id)
    if(response.data.status=='success'){
      setcartNumber(cartNumber-1)
      setCartDetails(response.data.data)  
    }
    setLoading((prev) => ({ ...prev, [id]: false }))
  }

  async function deleteAllItems() {
    let response =await deleteUserCart()
     //console.log(response);
    if(response.data.message=='success'){
      setcartNumber(0)
      setCartDetails(null)  
    }
    
  }
  
  

  useEffect(()=>{
    getCartItems()
  },[])

  return<>
     
<div className='container mx-auto bg-slate-100 p-8'>

<div className='flex justify-between '>
  <h2 className='font-semibold text-2xl'>Cart Shop</h2>
  <Link to={'/checkout'}><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Check Out</button></Link>
</div>

  <div className='flex justify-between '>
    <h2 className='font-normal text-2xl'>total price :<span className='text-green-400'> {CartDetails?.totalCartPrice}</span></h2>
    <h2 className='font-normal text-2xl'>total number of items : <span className='text-green-400'> {CartDetails?.products.length}</span></h2>
  </div>

<div className=" overflow-x-auto  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   
    <tbody>

      {CartDetails?.products.map((product)=>{
         return <tr key={product.product.id} className=" border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">


          <td className="p-4">
            <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full"  />
          </td>

          <td>
            <div className="px-6 pb-2 font-semibold text-gray-900 dark:text-white">
              {product.product.title.split(" ").slice(0, 2).join(" ")}
            </div>

            <div className="px-6 pb-2 font-semibold text-gray-900 dark:text-white">
              {product.price} EGP
            </div>

            <div className="px-6 py-2">
              <a 
                onClick={() => deleteItem(product.product.id)} 
                href="#" 
                className="text-red-600 dark:text-red-500 flex items-center"
              >

                {loading[product.product.id] ? (
                  <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                ) : (
                  <i className="fa-solid fa-trash text-sm"></i>
                )}
                <span className="ms-3">{loading[product.product.id] ? "Removing..." : "Remove"}</span>

              </a>
            </div>
          </td>

          
        
          <td className="px-6 py-4">
            <div className="flex items-center">
              <button onClick={()=>updateProduct(product.product.id,product.count-1)} className="inline-flex items-center justify-center py-4 px-2 rounded-md me-3 text-sm font-medium h-6 w-6 text-black  border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                </svg>
              </button>
              <h4>{product.count}</h4>
              <button onClick={()=>updateProduct(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 py-4 px-2 ms-3 rounded-md   text-sm font-medium text-black  border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </td>
         
          
          


        </tr>
      })}

     


   
    </tbody>
  </table>
</div>


<div className='  py-8 text-center'>
  <button onClick={()=>deleteAllItems()} type="button" className="text-black   font-light rounded-lg text-2xl px-5 py-2.5 me-2 mb-2   border border-green-400 ">Clear Your Cart</button>
</div>


  
</div>     





  
  </>
  
}
