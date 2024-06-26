import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Modal, Image, Button, Grid, Header } from "semantic-ui-react";
import { getCaption } from "./index";

export const ImgCarousel = ({
  imagesCollection,
  settings = {
    infinite: false,
    speed: 100,
    swipeToSlide: true,
  },
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [slidesToShow, setSlidesToShow] = useState(5);
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

  let selectedImage = imagesCollection?.[selectedImageIndex];

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

  settings = { ...settings, slidesToShow: slidesToShow };

  return (
    <>
      <Slider {...settings}>
        {imagesCollection?.map((image, index) => {
          return (
            <Image
              key={index}
              src={image.links.content}
              alt={getCaption(selectedImage)}
              onClick={() => {
                setSelectedImageIndex(index);
                setModalOpen(true);
              }}
            />
          );
        })}
      </Slider>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content image>
          <Button icon="chevron left" color="black" onClick={handlePrevImage} />
          <Grid columns={1}>
            <Image src={selectedImage?.links?.content} />
            <Header as="h4">{getCaption(selectedImage)}</Header>
          </Grid>
          <Button
            icon="chevron right"
            color="black"
            onClick={handleNextImage}
          />
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
