import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ImgCarousel } from "./Carousel.jsx";
import { FilesSection } from "./DocsSection.jsx";

const imgGalleryComp = document.getElementById("images-carousel");
const filesDivComp = document.getElementById("details-docs");

async function fetchAndRender() {
  try {
    const apiUrl = imgGalleryComp.dataset.photos.replace(/"/g, "");

    const response = await fetch(apiUrl);

    const data = await response.json();
    // const [imageUrls, setImageUrls] = useState([]);
    let imageUrls;
    let imagesCollection;

    // Fetch and set image URLs

    const fetchImages = async () => {
      try {
        const urls = await Promise.all(
          data?.entries?.map(async (item) => {
            if (
              item?.metadata?.fileType === "photo" ||
              item?.mimetype?.startsWith("image")
            ) {
              imagesCollection.push(item);

              const response = await fetch(item.links.content);
              const blob = await response.blob();
              return URL.createObjectURL(blob);
            }
            return null;
          })
        );

        const filteredUrls = urls.filter((url) => url !== null);
        imageUrls = [filteredUrls];
      } catch (error) {
        console.error("Error fetching images");
      }
    };

    fetchImages();

    ReactDOM.render(<ImgCarousel imgs={imageUrls} />, imgGalleryComp);
    // ReactDOM.render(<FilesSection files={filesUrls} />, filesDivComp);
  } catch (error) {
    console.error("Error fetching data");
  }
}

fetchAndRender();
