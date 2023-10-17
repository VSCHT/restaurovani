import React, { useEffect } from "react";
import Slider from "react-slick";
import ReactDOM from "react-dom";

export const ImgCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  
  useEffect(() => {
    const imgGalleryComp = document.getElementById("images-carousel");
    
    if (imgGalleryComp) {
      const imgs = JSON.parse(imgGalleryComp.getAttribute("data-photos"));
      
      ReactDOM.render(
        <div>
          <h2> Simple Slider </h2>
          <Slider {...settings}>
            {imgs.map((item) => (
              <div key={item.id}>
                <img src={item.src} alt={item.alt} className="img" />
              </div>
            ))}
          </Slider>
        </div>,
        imgGalleryComp
      );
    }
  }, []);

  return null;
};
