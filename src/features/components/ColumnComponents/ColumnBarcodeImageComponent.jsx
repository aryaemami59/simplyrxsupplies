import { memo, useCallback, useEffect } from "react";
import printjs from "print-js";
import PrintIconComponent from "./PrintIconComponent";
// import { LazyLoadImage } from "react-lazy-load-image-component";

function ColumnBarcodeImageComponent({ src, itemNumber }) {
  // const clickHandler = useCallback(() => {
  //   printjs({
  //     printable: src,
  //     type: "image",
  //     header: itemNumber,
  //     imageStyle: "width:80%;margin-bottom:20px;",
  //   });
  // }, [src, itemNumber]);

  useEffect(() => {
    // console.log("ColumnBarcodeImageComponent mounts");
    // return () => console.log("ColumnBarcodeImageComponent unmounts");
  }, []);

  // return <LazyLoadImage src={src} alt={itemNumber} />;
  return (
    <div>
      <img src={src} alt={itemNumber} />
      <PrintIconComponent src={src} text={"Print The Barcode"} />
    </div>
  );
}

export default memo(ColumnBarcodeImageComponent);
