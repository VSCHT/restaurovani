import React from "react";
import ReactDOM from "react-dom";
import { ImgCarousel, FilesSection } from "./Carousel.jsx";
import '../../../less/slick-styles.less'



const imgGalleryComp = document.getElementById("images-carousel");
const filesDivComp = document.getElementById("details-docs");

async function fetchAndRender() {
  try {
    const apiUrl = imgGalleryComp.dataset.photos.replace(/"/g, "");

    const response = await fetch(apiUrl);

    const data = await response.json();

    ReactDOM.render(<ImgCarousel imgs={data.entries} />, imgGalleryComp);
    ReactDOM.render(<FilesSection files={data.entries}/>, filesDivComp);

  } catch (error) {
    console.log("Error fetching data");
  }
}

fetchAndRender();


