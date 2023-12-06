import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";

export function ImageWithFallback({ src, result, fallbackSrc}) {
  const [imageSrc, setImageSrc] = useState([src]);
  const handleImageError = () => {
    setImageSrc([fallbackSrc]);
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
        setImageUrlFeat(fImg);

        const rImg = res?.entries?.[0] ?? res?.entries?.[1];

        setImageUrlRand(rImg);
      })

      .catch(() => console.log("No photos"));
  }, [result]);

  return imgUrlFeat || imgUrlRand ? (
    <Image
      src={imgUrlFeat?.links?.content ?? imgUrlRand?.links?.content ?? src}
      onError={handleImageError}
      alt={`Foto predmetu ${
        imgUrlFeat?.[0]?.metadata?.caption === undefined ||
        imgUrlRand?.[0]?.metadata?.caption === undefined
          ? ""
          : imgUrlFeat?.[0]?.metadata?.caption ||
            imgUrlFeat?.[0]?.metadata?.caption === undefined
      }`}
    />
  ) : (
    <Image src={imageSrc} onError={handleImageError} alt={`Foto predmetu`} />
  );
}
