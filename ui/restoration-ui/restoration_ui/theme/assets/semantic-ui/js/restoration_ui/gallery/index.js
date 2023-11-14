import React from "react";
import ReactDOM from "react-dom";
import { ImgCarousel, FilesSection } from "./Carousel.jsx";

// const imgGalleryComp = document.getElementById("images-carousel");
// const imgsDirty = JSON.parse(imgGalleryComp.dataset.photos);

const imgGalleryComp = document.getElementById("images-carousel");
const filesDivComp = document.getElementById("details__div__docs");


 console.log(imgGalleryComp)

 async function fetchAndRender() {
  try {
    const apiUrl = imgGalleryComp.dataset.photos.replace(/"/g, '');

    const response = await fetch(apiUrl);

    console.log(response);

    const data = await response.json();

    console.log(data.entries);

    ReactDOM.render(
      <ImgCarousel imgs={data.entries} />,
      imgGalleryComp
    );
    ReactDOM.render(
      <FilesSection files={data.entries} />,
      filesDivComp
    );

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAndRender();







// ReactDOM.render(
//   <ImgCarousel imgs={imgs}/>,

//   imgGalleryComp
// );

export { ImgCarousel } from "./Carousel.jsx";

