import React from "react";
import ReactDOM from "react-dom";
import { ImgCarousel } from "./Carousel.jsx";
import { FilesSection } from "./FilesSection.jsx";

const imgGalleryComp = document.getElementById("images-carousel");
const filesDivComp = document.getElementById("details-docs");

let imagesCollection = [];
let filesCollection = [];
let data;

const fetchImages = async () => {
  try {
    const apiUrl = imgGalleryComp.dataset.photos.replace(/"/g, "");
    const response = await fetch(apiUrl);

    data = await response.json();

    await Promise.all(
      data?.entries?.map(async (item) => {
        if (
          item?.metadata?.fileType === "photo" ||
          item?.mimetype?.startsWith("image")
        ) {
          imagesCollection.push(item);

          const response = await fetch(item.links.content);

          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } else{
          filesCollection.push(item);
        }
        return null;
      })
    );
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
    await fetchImages();

    ReactDOM.render(
      <ImgCarousel imagesCollection={imagesCollection}/>,
      imgGalleryComp
    );
    ReactDOM.render(<FilesSection filesCollection={filesCollection}/>, filesDivComp);
  } catch (error) {
    console.error("Error rendering component");
  }
}

fetchAndRender();

const accordionTitles = document.querySelectorAll(".title");
const accordionContents = document.querySelectorAll(".content");

accordionTitles.forEach((title, index) => {
  title.addEventListener("click", () => {
    title.classList.toggle("active");
    if (accordionContents[index].style.display === "flex") {
      accordionContents[index].style.display = "none";
    } else {
      accordionContents[index].style.display = "flex";
      accordionContents[index].style.flexDirection = "column";
    }
  });
});
