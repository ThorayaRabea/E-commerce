import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ProductDetails() {
    let {id,category}=useParams()
  const [Product, setProduct] = useState(null)
  const [relatedProsucts, setrelatedProsucts] = useState([])
  const [imgs, setimgs] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);


async function getSpecificProduct(id) {
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then( (res)=>{
        setProduct(res.data.data)
        setimgs(res.data.data.images)
    } )
    .catch( ()=>{}  )
}

async function getAllProducts() {
    await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then( (res)=>{
        /// res.data.data => all products
     setrelatedProsucts( res.data.data.filter( (item)=> {
            return item.category.name==category} ))
    
    })
}

useEffect( ()=>{
    getSpecificProduct(id)
    getAllProducts()
},[id,category] )



////////////////////button carousel////////////
    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length);
    };
//////////////////////////////////////////////////////    
    
  return (
    <>
 <div className='container md:flex '>

  {/* ////////////////////img//////////  */}

<div id="default-carousel" className="relative w-full  md:w-1/3" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div className="relative h-[32rem] overflow-hidden rounded-lg  md:h-[28rem]">

        {
            imgs.map((img,index)=>(
                <div key={index} className={`duration-700 ease-in-out absolute block w-full transition-opacity ${index===activeIndex ? `opacity-100` : `opacity-0 hidden`}`}>
                    <img src={img} className='absolute block w-full bg-cover'  alt={`slide ${index+1}`}/>

                </div>
            )
        
        )
        }
       
    </div>

    
    <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer" onClick={prevSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
                    <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer" onClick={nextSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
                    <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>


    
    
</div>

  {/* //////////////////////Details///////////   */}

  <div className='w-2/3 flex  items-center ps-5'>
    <div>
     <h2 className='text-4xl text-gray-900 dark:text-white mb-2'>{Product?.category.name}</h2>
     <h2 className='mb-3'>{Product?.description}</h2>
     <div className='flex justify-between mb-3'>
        <h3>{Product?.price} EGP</h3>
        <h3 ><i className='fas fa-star text-yellow-400'></i>{Product?.ratingsAverage}</h3>
     </div>
     <div className='text-end mb-3'><i className='fas fa-heart text-3xl cursor-pointer'></i></div>
     <div className='text-center mb-3 '>
        <button className='w-full bg-green-600 rounded-lg text-white btn py-1 '>+ Add</button>
     </div>


    </div>
  </div>


</div>



<div className="row ">
         {relatedProsucts.length>0? relatedProsucts.map( (product)=>{
            return <div className='w-full mb-20 px-3 product me-3 md:w-[30%] lg:w-[23%]' key={product.id}>
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt="" className='w-full' />
                <h3 className='text-green-500'>{product.category.name}</h3>
                <h3 className='font-bold mb-2'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className='flex justify-between mb-3'>
                    <h3>{product.price} EGP</h3>
                    <h3 ><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</h3>
                </div></Link>
                <div className='text-end'><i className='fas fa-heart text-3xl cursor-pointer'></i></div>
                
                <div className='text-center mb-3 '>
                    <button className='w-[80%] bg-green-600 rounded-lg text-white btn py-1 '>+ Add</button>
                </div>
                
            </div>
         } ) :<span className="loader"></span>}
         
       </div>







    </>
  )




}


