import { CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import type { ItemName } from "../../types/api";
import { itemNames } from "../../types/api";

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
