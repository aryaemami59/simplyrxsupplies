import PropTypes from "prop-types";
import { CardHeader } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import type { ItemName } from "../../custom_types/api";
import { itemNames } from "../../custom_types/api";

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
