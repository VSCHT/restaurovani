import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal, Image, Button } from "semantic-ui-react";
import Media from "react-media";

export const ImgCarousel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    const imgs = document.querySelectorAll(".predmety__imgs__img");

    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        setSelectedImage(img.src);
        setModalOpen(true);
      });
    });

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("click", () => {
          setSelectedImage(img.src);
          setModalOpen(true);
        });
      });
    };
  }, []);

  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth <= 992) {
        setSlidesToShow(3);
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: slidesToShow,
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
    <>
      <Slider {...settings}>
        {imgs.map((item) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            className="predmety__imgs__img"
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
            <Image src={selectedImage} className="modal-image" />
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
