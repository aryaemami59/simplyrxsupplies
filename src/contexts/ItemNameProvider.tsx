import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";

import type { ItemName } from "../types/api";
import { itemNames } from "../types/api";

type Props = {
  children: ReactNode;
  itemName: ItemName;
};

export const ItemNameContext = createContext<ItemName>("10 Dram Vials");

const ItemNameProvider: FC<Props> = ({ children, itemName }) => (
  <ItemNameContext.Provider value={itemName}>
    {children}
  </ItemNameContext.Provider>
);

ItemNameProvider.propTypes = {
  children: PropTypes.node.isRequired,
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(ItemNameProvider);
