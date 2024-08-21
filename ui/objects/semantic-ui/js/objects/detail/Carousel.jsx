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
    focusOnSelect: true,
    swipeToSlide: true,
    slidesToShow: imagesCollection.length <= 3 ? imagesCollection.length : 3,
    lazyLoad: true,
    centerMode: false,
    // adaptiveHeight: true,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: imagesCollection.length <= 2 ? imagesCollection.length : 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: imagesCollection.length <= 1 ? imagesCollection.length : 1,
          centerMode: true,
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

  return (
    <>
      <Suspense fallback={<Loader size="big" active />}>
        <Slider {...settings}>
          {imagesCollection?.map((image, index) => {
            return (
              <Grid key={image.key} columns={1} centered padded>
                <Image
                  as={Grid.Row}
                  src={image.links.content}
                  alt={getCaption(image)}
                  className="slick-image"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setModalOpen(true);
                  }}
                />
                <Grid.Row as="span" className="carousel-img-caption">{getCaption(image)}</Grid.Row>
              </Grid>
            );
          })}
        </Slider>
      </Suspense>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content image>
          <Button icon="chevron left" color="black" onClick={handlePrevImage} />
          <Grid columns={1} centered>
            <Image
              as="a"
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
