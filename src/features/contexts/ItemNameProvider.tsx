import PropTypes from "prop-types";
import { createContext, FC, memo, ReactNode } from "react";
import { ItemName, itemNames } from "../../custom_types/types";

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
