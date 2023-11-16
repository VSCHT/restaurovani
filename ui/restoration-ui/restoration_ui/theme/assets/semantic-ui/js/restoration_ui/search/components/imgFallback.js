import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";

export function ImageWithFallback({ src, fallbackSrc, alt, result, classN }) {
  const [imageSrc, setImageSrc] = useState([src]);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  const [imgUrls, setImageUrls] = useState([src]);

  useEffect(() => {
    fetch(result?.links?.files)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then(async (res) => {
        const fImg = res?.entries?.filter(
          (item) => item.metadata.featured == true
        );
        setImageUrls(fImg);
      })

      .catch((e) => console.log("No photos"));
  }, [result]);


  return imgUrls?.[0] ? (
    <Image
      src={imgUrls?.[0]?.links?.content}
      onError={handleImageError}
      alt={alt}
    />
  ) : (
    <Image
      src={imageSrc}
      onError={handleImageError}
      alt={alt}
      className={classN}
    />
  );
}
