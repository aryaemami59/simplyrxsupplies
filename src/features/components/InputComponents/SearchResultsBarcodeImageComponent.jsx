import { memo } from "react";
const SearchResultsBarcodeImageComponent = ({ itemObj, }) => {
    return (<img key={`img-SearchResultsBarcodeImageComponent-${itemObj.name}`} src={itemObj.src} alt={`${itemObj.itemNumber}-${itemObj.name}`} className="flex-grow-0 flex-shrink-0 w-auto px-0 px-sm-2 px-lg-0 px-xl-2"/>);
};
export default memo(SearchResultsBarcodeImageComponent);
