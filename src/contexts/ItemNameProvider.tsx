import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";

import { itemNames } from "../types/aa";

type Props = {
  children: ReactNode;
  itemName: string;
};

export const ItemNameContext = createContext<string>("10 Dram Vials");

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
