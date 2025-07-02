import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "../assets/css/Banner.css"; // Import your custom CSS for styling

import img1 from "../assets/imgs/banner1.png";
import img2 from "../assets/imgs/banner2.png";
import img3 from "../assets/imgs/banner3.png";
import img4 from "../assets/imgs/banner4.png";

const banners = [img1, img2, img3, img4];

const Banner = () => {
  return (
    <div className="banner-container" style={{ position: "relative" }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        
        navigation={true} // 👈 Bật nút điều hướng
        loop={true}
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
