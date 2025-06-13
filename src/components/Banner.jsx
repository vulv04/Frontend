import React from "react";
import bannerImage from "../assets/imgs/slider_1.png"; // Adjust the path as necessary
const Banner = () => {
  return (
    <div>
      <img
        src={bannerImage}
        alt="Banner"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Banner;
