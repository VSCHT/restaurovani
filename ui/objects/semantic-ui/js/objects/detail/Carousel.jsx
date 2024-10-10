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
            const caption = getCaption(image);
            return (
              <Grid key={image.key} columns={1} centered padded>
                <Image
                  as={Grid.Row}
                  src={image.links.content}
                  alt={caption}
                  className="slick-image zoomable-image"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setModalOpen(true);
                  }}
                />
                <Grid.Row as="span" className="carousel-img-caption overflow-wrap-anywhere">{caption}</Grid.Row>
              </Grid>
            );
          })}
        </Slider>
      </Suspense>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        closeIcon
      >
        <Modal.Content>
          <Grid columns={3}>
            <Grid.Column width={1} verticalAlign="middle" textAlign="left">
              <Button 
                icon="chevron left" 
                size="large"
                color="black"
                className="transparent"
                onClick={handlePrevImage}
              />
            </Grid.Column>
            <Grid.Column width={14}>
              <Grid columns={1} textAlign="center" verticalAlign="middle">
                <Image
                  as="a"
                  verticalAlign="bottom"
                  src={selectedImage?.links?.content}
                  href={selectedImage?.links?.content}
                  className="modal-content-image zoomable-image"
                  target="_blank"
                />
                <Header as="h4" textAlign="center" className="overflow-wrap-anywhere">{getCaption(selectedImage)}</Header>
              </Grid>
            </Grid.Column>
            <Grid.Column width={1} verticalAlign="middle" textAlign="right">
              <Button
                icon="chevron right"
                size="large"
                color="black"
                className="transparent"
                onClick={handleNextImage}
              />
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
};
