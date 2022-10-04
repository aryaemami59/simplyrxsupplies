// import { Props } from "@fortawesome/react-fontawesome";
import {
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import { FC, memo, useCallback, useContext, useState } from "react";
import { shallowEqual } from "react-redux";
import { DarkMode } from "../../../App";
import { vendorNameType } from "../../../customTypes/types";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SingleDropDown from "./SingleDropDown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const useStyles = makeStyles(theme => ({
//   textTertiary: {
//     color: theme.palette.tertiary.main,
//     "&:hover": {
//       backgroundColor: Fade(
//         theme.palette.tertiary.main
//         // theme.palette.action.hoverOpacity
//       ),
//       // Reset on touch devices, it doesn't add specificity
//       "@media (hover: none)": {
//         backgroundColor: "transparent",
//       },
//     },
//   },
// }));

type Props = {
  vendorName: vendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  const dropdownOpenColor: "text-white btn-info" | "text-white btn-dark" =
    darkTheme ? "text-white btn-info" : "text-white btn-dark";
  const border = darkTheme
    ? "border-info bg-dark text-info"
    : "border-dark bg-light text-dark";
  const theme = darkTheme ? "dark" : "light";
  const textColor = darkTheme ? "text-info" : "btn-light";
  const toggleClassName = dropdownOpen ? dropdownOpenColor : "";

  return (
    <>
      <FormControl
        style={{ color: "white" }}
        sx={{ m: 1, width: 300 }}
      >
      {/* <InputLabel
        style={{ color: "white" }}
        id={vendorName}>
        {officialVendorName}
      </InputLabel> */}
      <Select
        // fullWidth
        // labelId={vendorName}
        // id={"vendorName"}
        style={{ color: "white" }}
        label={officialVendorName}
        // multiple
        // value={officialVendorName}
        // value={items}
        open={dropdownOpen}
        onOpen={toggle}
        onClose={toggle}
        // input={
        //   <OutlinedInput
        //     style={{ color: "white" }}
        //     label={officialVendorName}
        //     value={officialVendorName}
        //   />
        // }
        // MenuProps={MenuProps}
        // color="error"
        // onChange={toggle}
        // title={officialVendorName}
        // show={dropdownOpen}
        // focusFirstItemOnShow="keyboard"
        // onToggle={toggle}
      >
        {/* <Dropdown.Toggle
            className={`custom-text-shadow-whit btn ${textColor} ${toggleClassName}`}
            as="button">
            {officialVendorName}
          </Dropdown.Toggle> */}
        {/* <Dropdown.Menu
            variant={theme}
            renderOnMount
            className={`border ${border}`}
            show={dropdownOpen}> */}
        {items.map(itemObj => (
          <SingleDropDown
            key={`${itemObj.id}-${vendorName}`}
            {...{ itemObj, vendorName }}
          />
        ))}
        {/* </Dropdown.Menu> */}
      </Select>
      </FormControl>
    </>
  );
};

export default memo<Props>(VendorDropDown);
