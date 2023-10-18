import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Media from "react-media";

export const ImgCarousel = () => {
  function myFunction(x) {
    if (x.matches) {
      return 3;
    } else {
      return 5;
    }
  }

  let x = window.matchMedia("(max-width: 992px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: myFunction(x),
    slidesToScroll: 3,
  };

  const imgs = [
    {
      id: "0",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage.jpg",
    },
    {
      id: "1",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage 2.jpg",
    },
    {
      id: "2",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage 2.jpg",
    },
    {
      id: "3",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage 3.jpg",
    },
    {
      id: "4",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage 3.jpg",
    },
    {
      id: "5",
      alt: "foto predmetu",
      src: "/static/images/ItemLandingPage 3.jpg",
    },
  ];

  return (
    <Slider {...settings}>
      {imgs.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt={item.alt}
          className="predmety__imgs__img"
        />
      ))}
    </Slider>
  );
};
