import { FC, memo } from "react";
import { ButtonGroup } from "react-bootstrap";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";

const ColumnHideButtons: FC = () => (
  <ButtonGroup className="flex-wrap justify-content-center w-100">
    <ColumnToggleNamesButton />
    <ColumnToggleItemNumbersButton />
    <ColumnToggleItemBarcodesButton />
  </ButtonGroup>
);

export default memo(ColumnHideButtons);
