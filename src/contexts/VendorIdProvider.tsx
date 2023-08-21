import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";

type Props = {
  children: ReactNode;
  vendorId: number;
};

export const VendorIdContext = createContext<number>(0);

const VendorIdProvider: FC<Props> = ({ children, vendorId }) => (
  <VendorIdContext.Provider value={vendorId}>
    {children}
  </VendorIdContext.Provider>
);

VendorIdProvider.propTypes = {
  children: PropTypes.node.isRequired,
  vendorId: PropTypes.number.isRequired,
};

export default memo<Props>(VendorIdProvider);
