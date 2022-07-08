import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";



// import required modules
import { Pagination, Navigation,Autoplay,EffectFade } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade'


import { Box } from '@mui/material';


const ImageSrcollbar = ({productDetails}) => {

  return (
    <Swiper
    pagination={{
      dynamicBullets: true,
      clickable : true
    }}
    modules={[Pagination,Autoplay,EffectFade,Navigation]}
    navigation={true}
    autoplay={true}
    speed={1000}
    effect={'fade'}
   style={{paddingBottom:'20px'}}

      >
{productDetails.product.images && productDetails.product.images.map((item,i)=>{
  return(
   <SwiperSlide key={i}><Box component={'img'}  src={item.url}  height={'380px'} width='100%' alt={` Slide`}></Box></SwiperSlide>

 )
})}
 

  </Swiper>
  )
}

export default ImageSrcollbar