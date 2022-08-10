import { memo, useEffect } from "react";
import PrintIconComponent from "./PrintIconComponent";
// import { LazyLoadImage } from "react-lazy-load-image-component";

function ColumnBarcodeImageComponent({
  src,
  itemNumber,
  itemObj,
  vendorName,
  officialVendorName,
}) {
  useEffect(() => {
    // console.log("ColumnBarcodeImageComponent mounts");
    // return () => console.log("ColumnBarcodeImageComponent unmounts");
  }, []);

  // return <LazyLoadImage src={src} alt={itemNumber} />;
  return (
    <div>
      <img src={src} alt={itemNumber} />
      <PrintIconComponent
        src={src}
        text={"Print This Barcode"}
        header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
      />
    </div>
  );
}

export default memo(ColumnBarcodeImageComponent);
