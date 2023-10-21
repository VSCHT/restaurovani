import React from "react";
import ReactDOM from "react-dom";
import { ImgCarousel } from "./Carousel.jsx";

const imgGalleryComp = document.getElementById("images-carousel");
console.log(imgGalleryComp)
ReactDOM.render(
  <ImgCarousel />,

  imgGalleryComp
);

export { ImgCarousel } from "./Carousel.jsx";
