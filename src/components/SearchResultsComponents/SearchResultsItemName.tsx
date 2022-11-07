import PropTypes from "prop-types";
import { CardHeader } from "@mui/material";
import { FC, memo } from "react";
import { ItemName, itemNames } from "../../custom_types/api";

type Props = {
  itemName: ItemName;
};

const SearchResultsItemName: FC<Props> = ({ itemName }) => (
  <CardHeader title={itemName} />
);

SearchResultsItemName.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsItemName);
