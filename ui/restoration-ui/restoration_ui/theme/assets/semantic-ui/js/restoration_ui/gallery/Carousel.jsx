import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, Image, Button } from "semantic-ui-react";


export const ImgCarousel = ({ imgs }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [imageUrls, setImageUrls] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length
    );
  };

  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth <= 992 && window.innerWidth >= 530) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 530) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(5);
      }
    }
    updateSlidesToShow();

    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await Promise.all(
        imgs.map(async (item) => {
          if (item.metadata.fileType=='photo') {
            const response = await fetch(item.links.content);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          }
          return null;
        })
      );
      setImageUrls(urls);
    };

    fetchImages();
  }, [imgs]);

  return (
    <>
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            // alt={imgs[index].metadata.caption}
            className="predmety__imgs__img"
            onClick={() => {
              setSelectedImageIndex(index);
              setModalOpen(true);
            }}
          />
        ))}
      </Slider>

      <div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className="custom-modal"
        >
          <Modal.Content image className="modal-content">
            <Button
              icon="chevron left"
              onClick={handlePrevImage}
              className="carousel-button left"
            />
            <Image
              src={imageUrls[selectedImageIndex]}
              className="modal-image"
            />
            <Button
              icon="chevron right"
              onClick={handleNextImage}
              className="carousel-button right"
            />
            <Button
              icon="close"
              onClick={() => setModalOpen(false)}
              className="close-button"
            />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};


export const FilesSection = ({ files }) => {
  return (
    <div className="horiz-div details__div__docs">
      <p className="parag">Dokumenty</p>
      <div className="horiz-div details__div__docs-files">
        {files.map((file, index) => {
          const isFile = file.metadata.fileType.startsWith("document");
          if (isFile) {
            return (
              <div
                className="horiz-div details__div__docs__item"
                key={file.key}
              >
                <img
                  className="details__div__docs-img"
                  src="/static/images/file-icon.png"
                  alt="file icon"
                />
                <p className="parag">
                  <a href={file.links.content}>{file.metadata.caption}</a>
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};


