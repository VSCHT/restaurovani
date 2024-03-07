import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Modal, Image, Button, Grid, Header } from "semantic-ui-react";

export const ImgCarousel = ({ imagesCollection }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  let selectedImage = imagesCollection?.[selectedImageIndex];

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
              alt={
                selectedImage?.metadata.caption === "default_image_name" ||
                selectedImage?.metadata.caption == 0
                  ? selectedImage?.key
                  : selectedImage?.metadata.caption
              }
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
          <Button icon="chevron left black" onClick={handlePrevImage} />
          <Grid columns={1}>
            <Image src={selectedImage?.links?.content} />
            <Header as="h4">
              {selectedImage?.metadata.caption === "default_image_name" ||
              selectedImage?.metadata.caption == 0
                ? selectedImage?.key
                : selectedImage?.metadata.caption}
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
