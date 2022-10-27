import { createContext, FC, memo, ReactNode } from "react";
import { ItemName } from "../../customTypes/types";

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

export default memo<Props>(ItemNameProvider);
