

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, Image, Button } from "semantic-ui-react";

export const ImgCarousel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

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
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length);
  };

  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth <= 992 && window.innerWidth >= 530) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 530 ){
        setSlidesToShow(2);
      } else {
        setSlidesToShow(5);
      }
    }
    updateSlidesToShow();

    window.addEventListener("resize", updateSlidesToShow);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  return (
    <>
      <Slider {...settings}>
        {imgs.map((item, index) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            className="predmety__imgs__img"
            onClick={() => {
              setSelectedImageIndex(index);
              setModalOpen(true);
            }}
          />
        ))}
      </Slider>
      <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} className="custom-modal">
          <Modal.Content image className="modal-content">
            <Button icon="chevron left" onClick={handlePrevImage} className="carousel-button left" />
            <Image src={imgs[selectedImageIndex].src} className="modal-image" />
            <Button icon="chevron right" onClick={handleNextImage} className="carousel-button right" />
            <Button icon="close" onClick={() => setModalOpen(false)} className="close-button" />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};