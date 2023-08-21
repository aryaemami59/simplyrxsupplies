import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";

type Props = {
  children: ReactNode;
  itemId: number;
};

export const ItemIdContext = createContext<number>(0);

const ItemIdProvider: FC<Props> = ({ children, itemId }) => (
  <ItemIdContext.Provider value={itemId}>{children}</ItemIdContext.Provider>
);

ItemIdProvider.propTypes = {
  children: PropTypes.node.isRequired,
  itemId: PropTypes.number.isRequired,
};

export default memo<Props>(ItemIdProvider);
