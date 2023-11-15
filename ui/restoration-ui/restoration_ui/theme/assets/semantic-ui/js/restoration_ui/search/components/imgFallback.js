import React, { useState } from "react";
import { Image } from "semantic-ui-react";

export function ImageWithFallback({ src, fallbackSrc, alt, result , classN}) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  return result?.links?.files?.entries?.[0]?.links?.content ? (
    <Image
      src={result?.links?.files?.entries?.[0]?.links?.content}
      onError={handleImageError}
      alt={alt}
    />
  ) : (
    <Image src={imageSrc} onError={handleImageError} alt={alt} className={classN} />
  );
}


