import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
    const [Category, setCategory] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000
      };

      async function getCategorys() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then( (res)=>{
            setCategory(res.data.data)
        } )
      }

      useEffect( ()=>{
        getCategorys()
      } ,[])

  return (
    <Slider {...settings}>
        {
            Category.map( (item,index)=>{
                return <div key={index}>
                <img src={item.image} alt="" className='w-full h-[300px]'/>
                <h2 className='font-semibold '>{item.name}</h2>
                </div>
            } )
        }
    </Slider>
  )
}
