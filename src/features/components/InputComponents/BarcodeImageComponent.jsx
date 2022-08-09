import { memo, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BarcodeImageComponent({ src, itemNumber }) {
  useEffect(() => {
    // console.log("BarcodeImageComponent mounts");
    // return () => console.log("BarcodeImageComponent unmounts");
  }, []);

  // return <LazyLoadImage src={src} alt={itemNumber} />;
  return <img src={src} alt={itemNumber} />;
}

export default memo(BarcodeImageComponent);
