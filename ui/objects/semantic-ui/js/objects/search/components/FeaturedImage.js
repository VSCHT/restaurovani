import React, { useState } from "react";
import { ItemImage } from "semantic-ui-react";

export function FeaturedImage({ src, result}) {
  

  return (
    <>
      <ItemImage
        size="tiny"
        src={result?.links?.content ?? src}
        alt={
          result?.[0]?.metadata?.caption === undefined
            ? ""
            : result?.[0]?.metadata?.caption ||
              result?.[0]?.metadata?.caption === undefined
        }
      />
    </>
  );
}
