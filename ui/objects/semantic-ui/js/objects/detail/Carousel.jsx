import React, { useState, Suspense, lazy } from "react";
import { Modal, Image, Button, Grid, Header, Loader } from "semantic-ui-react";
import { getCaption } from "./index";

const Slider = lazy(() => import("react-slick"));

export const ImgCarousel = ({
  imagesCollection,
  settings = {
    // className: "",
    infinite: false,
    speed: 100,
    swipeToSlide: true,
    slidesToShow: 3,
    lazyLoad: true,
    // centerMode: true,
    // adaptiveHeight: true,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
  },
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const isVariableWidth = imagesCollection.length == 1;
  const sliderSettings = { ...settings, variableWidth: isVariableWidth };

  return (
    <>
      <Suspense fallback={<Loader size="big" active />}>
        <Slider {...sliderSettings}>
          {imagesCollection?.map((image, index) => {
            return (
              <Image
                key={index}
                src={image.links.content}
                alt={getCaption(selectedImage)}
                className="slick-image"
                onClick={() => {
                  setSelectedImageIndex(index);
                  setModalOpen(true);
                }}
              />
            );
          })}
        </Slider>
      </Suspense>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content image>
          <Button icon="chevron left" color="black" onClick={handlePrevImage} />
          <Grid columns={1}>
            <Image
              src={selectedImage?.links?.content}
              href={selectedImage?.links?.content}
              className="zoomable-image"
              target="_blank"
            />
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
