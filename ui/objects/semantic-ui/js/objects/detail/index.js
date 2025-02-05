import React from "react";
import ReactDOM from "react-dom";
import { ImgCarousel } from "./Carousel.jsx";
import { FilesSection } from "./FilesSection.jsx";
import $ from 'jquery'

const imgGalleryComp = document.getElementById("images-carousel");
const filesDivComp = document.getElementById("details-docs");

const fetchFiles = async () => {
  try {
    const apiUrl = imgGalleryComp.dataset.photos.replace(/"/g, "");
    const response = await fetch(apiUrl);
    const data = await response.json();

    const imagesCollection = [];
    const filesCollection = [];

    await Promise.allSettled(
      data?.entries?.map((item) => {
        if (
          item?.metadata?.fileType === "photo" ||
          item?.mimetype?.startsWith("image")
        ) {
          imagesCollection.push(item);
        } else {
          filesCollection.push(item);
        }
      })
    );

    return { imagesCollection, filesCollection };
  } catch (error) {
    console.error("Error fetching images");
  }
};

export const getCaption = (d) => {
  if (d?.metadata && d?.metadata?.caption) {
    if (
      d.metadata.caption === "default_image_name" ||
      d.metadata.caption === "default_pdf_name"
    ) {
      return d?.key;
    } else {
      return d.metadata.caption;
    }
  } else {
    return d?.key;
  }
};

async function fetchAndRender() {
  try {
    const { imagesCollection, filesCollection } = await fetchFiles();

    if (imagesCollection.length > 0) {
      ReactDOM.render(
        <ImgCarousel imagesCollection={imagesCollection} />,
        imgGalleryComp
      );
    }
    if (filesCollection.length > 0) {
      ReactDOM.render(
        <FilesSection filesCollection={filesCollection} />,
        filesDivComp
      );
    }
  } catch (error) {
    console.error("Error rendering component");
  }
}

fetchAndRender();


$(document).ready(function() {
  $('.ui.accordion').accordion();
});