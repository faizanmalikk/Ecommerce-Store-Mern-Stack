import React from 'react'
import { Box, Dialog, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade'

// import required modules
import { Pagination, Autoplay, EffectFade } from "swiper";
import img from '../../assets/slide1.png'
import img1 from '../../assets/slide2.png'
import img2 from '../../assets/slide4.webp'



const ImageScrollbar = () => {

    const data = [
        {
            url: img,
        },
        {
            url: img1,
        },
        {
            url: img2,
        },
    ]


    return (
        <>
            <Box height={{ xs: '50vh', sm: '70vh' }}>
                <Swiper

                    modules={[Pagination, Autoplay, EffectFade]}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true
                    }}
                    autoplay={true}
                    speed={1000}
                    effect={'fade'}
                    style={{
                        "--swiper-navigation-size": "25px",
                        paddingBottom: '30px'
                    }}
                >
                    {data.map((item, i) => (
                        <SwiperSlide key={i} >
                            <Box component={'img'} src={item.url} key={i} width='100%' height={{ xs: '50vh', sm: '70vh' }} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
}

export default ImageScrollbar