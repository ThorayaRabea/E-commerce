import React from 'react'
import Slider from 'react-slick'
import img1 from '../../assets/41nN4nvKaAL._AC_SY200_.jpg'
import img2 from '../../assets/61cSNgtEISL._AC_SY200_.jpg'
import img3 from '../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img4 from '../../assets/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };


  return (
    <div className='row mb-11 w-[70%] m-auto'>
      <div className='w-2/4'>
        <Slider {...settings}>
          <img src={img1} alt=""  className='w-full h-[400px] bg-center'/>
          <img src={img2} alt=""  className='w-full h-[400px] object-cover'/>
          <img src={img3} alt=""  className='w-full h-[400px] object-cover'/>
        </Slider>
      </div>
      <div className='w-2/4'>
        <img src={img4} alt=""  className='w-full h-[200px] object-cover'/>
        <img src={img5} alt=""  className='w-full h-[200px] object-cover'/>
      </div>
    </div>
  )
}
