import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Modal,
  Image,
  Button,
  Loader,
  Label,
  Grid,
  Header
} from "semantic-ui-react";

const fileName = (d) => {
  if (d?.metadata && d?.metadata?.caption) {
    if (
      d.metadata.caption === "default_image_name" ||
      d.metadata.caption === "default_pdf_name" ||
      Object.values(d.metadata.caption).length === 0
    ) {
      return d?.key;
    } else {
      return d.metadata.caption;
    }
  } else {
    return d?.key;
  }
};

export const ImgCarousel = ({ imgs }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesCollection, setImagesCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: loading ? 1 : slidesToShow,
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
    console.log();
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

  // Fetch and set image URLs
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await Promise.all(
          imgs?.map(async (item) => {
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
        setImageUrls(filteredUrls);
      } catch (error) {
        console.log("Error fetching images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [imgs]);

  return (
    <>
      <Slider {...settings}>
        {loading && <Loader active></Loader>}
        {imagesCollection?.map((image, index) => (
          <Image
            key={index}
            src={image.links.content}
            alt={fileName(image)}
            onClick={() => {
              setSelectedImageIndex(index);
              setModalOpen(true);
            }}
          />
        ))}
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

export const FilesSection = ({ files }) => {
  return files?.some((file) => file.metadata.fileType === "document") ? (
    <Grid columns={2}>
      <Grid.Column><Label className="bold">Dokumenty</Label></Grid.Column>
      <Grid.Column>
        {files?.map((file, index) => {
          if (
            file?.metadata?.fileType === "document" ||
            file?.mimetype?.startsWith("application")
          ) {
            return (
              <Grid.Row key={index}>
                <Image src="/static/images/file-icon.png" alt="file icon" />

                <a href={file.links.content}>{fileName(file)}</a>
              </Grid.Row>
            );
          }
        })}
      </Grid.Column>
    </Grid>
  ) : null;
};
