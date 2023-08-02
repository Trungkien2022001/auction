
import './Slider.scss'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
export const CustomSlider = ({ loading, images }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
  };

  return (
    <div className='slider-custom padding__main'>
      {
        loading ?
          <div className="loading" style={{width: "100%"}}>
            <Skeleton width={"100%"} height={250} />
          </div>
          :
          <Slider {...settings}>
            {
              images.length ? images.map((item, index) =>
                <div key={index}>
                  <img key={index} src={item.url} alt="" />
                </div>
              ) :
                <div>
                  <img src="https://cf.shopee.vn/file/vn-50009109-d8e17acb2723cb1ec37171c97f518aa2_xxhdpi" alt="" />
                </div>
            }
          </Slider>
      }
    </div>
  );
}