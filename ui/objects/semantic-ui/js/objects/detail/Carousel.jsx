import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Modal,
  Image,
  Button,
  Grid,
  Header
} from "semantic-ui-react";



export const ImgCarousel = ({ imagesCollection, fileName}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  // next image
  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % imagesCollection.length
    );
  };

  // previous image
  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + imagesCollection.length) % imagesCollection.length
    );
  };

  // Update slidesToShow
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 992 && window.innerWidth >= 530) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 530) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(5);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);



  return (
    <>
      <Slider {...settings}>
        {imagesCollection?.map((image, index) => {
          return (
          <Image
            key={index}
            src={image.links.content}
            alt={fileName(image)}
            onClick={() => {
              setSelectedImageIndex(index);
              setModalOpen(true);
            }}
          />
        )})}
      </Slider>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content image>
          <Button icon="chevron left black" onClick={handlePrevImage} />
          <Grid columns={1}>
            <Image
              src={imagesCollection?.[selectedImageIndex]?.links?.content}
            />
            <Header as="a3">
              {fileName(imagesCollection?.[selectedImageIndex])}
            </Header>
          </Grid>
          <Button icon="chevron right black" onClick={handleNextImage} />
        </Modal.Content>
        <Button
          icon="close"
          onClick={() => setModalOpen(false)}
          className="close transparent"
        />
      </Modal>
    </>
  );
};

