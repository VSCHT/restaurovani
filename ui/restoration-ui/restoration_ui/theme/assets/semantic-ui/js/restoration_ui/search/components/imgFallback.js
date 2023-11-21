import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";

export function ImageWithFallback({ src, result, classN }) {
  const [imageSrc, setImageSrc] = useState([src]);

  const handleImageError = () => {
    setImageSrc(imageSrc);
  };

  const [imgUrlFeat, setImageUrlFeat] = useState([src]);
  const [imgUrlRand, setImageUrlRand] = useState([src]);

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

        const rImg = res?.entries?.[0];
        setImageUrlFeat(fImg);
        setImageUrlRand(rImg);
      })

      .catch(() => console.log("No photos"));
  }, [result]);


  return imgUrlFeat?.[0] ? (
    <Image
      src={imgUrlFeat?.[0]?.links?.content}
      onError={handleImageError}
      alt={`Foto predmetu ${imgUrlFeat?.[0]?.metadata?.caption}`}
    />
  ) : (
    <Image
      src={imgUrlRand?.links?.content}
      onError={handleImageError}
      alt={`Foto predmetu ${imgUrlRand?.metadata?.caption}`}
      className={classN}
    />
  );
}
