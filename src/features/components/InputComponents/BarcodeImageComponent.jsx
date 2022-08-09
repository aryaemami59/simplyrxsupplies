import { memo, useEffect } from "react";

function BarcodeImageComponent({ src, itemNumber }) {
  useEffect(() => {
    // console.log("BarcodeImageComponent mounts");
    // return () => console.log("BarcodeImageComponent unmounts");
  }, []);

  return <img src={src} alt={itemNumber} />;
}

export default memo(BarcodeImageComponent);
