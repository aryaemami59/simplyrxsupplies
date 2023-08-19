import type { CardHeaderProps } from "@mui/material/CardHeader";
import CardHeader from "@mui/material/CardHeader";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import { itemNames } from "../../types/aa";
import { SearchResultsItem } from "../../types/redux";

type Props = {
  item: SearchResultsItem;
};

const titleTypographyProps: CardHeaderProps["titleTypographyProps"] = {
  className: "fs-5",
} as const;

const SearchResultsItemName: FC<Props> = ({ item }) => {
  return (
    <CardHeader
      className="p-1 p-lg-auto"
      title={item}
      titleTypographyProps={titleTypographyProps}
    />
  );
};

SearchResultsItemName.propTypes = {
  item: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsItemName);
