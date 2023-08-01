
import './Slider.scss'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
export const CustomSlider = ({ loading }) => {
  const images = [
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-d8e17acb2723cb1ec37171c97f518aa2_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-f752a84a7b2e658ee19f3ff1095deb8f_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-252ec83328b8d79f7ff7f1539659b943_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-4ec8e585c47bb735462d6c36710d20f5_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-995c96fe752c2815075fa3f72cf52f4b_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-af1267e10fa930adc551532664fddc2e_xxhdpi'
    },
  ]
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
                <div>
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