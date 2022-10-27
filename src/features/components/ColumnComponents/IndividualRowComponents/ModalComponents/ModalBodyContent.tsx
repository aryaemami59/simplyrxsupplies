import { List, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import VendorLink from "../../VendorLink";
import RowBarcodeImage from "../RowBarcodeImage";
import RowItemName from "../RowItemName";
import RowItemNumber from "../RowItemNumber";

const ModalBodyContent: FC = () => (
  <div className="justify-content-center text-center fs-4 row">
    <div className="justify-content-center col-10">
      <div className="container">
        <List>
          <RowItemName />
          <RowItemNumber />
          <RowBarcodeImage />
          <ListItemText>
            <VendorLink />
          </ListItemText>
        </List>
      </div>
    </div>
  </div>
);

export default memo(ModalBodyContent);
