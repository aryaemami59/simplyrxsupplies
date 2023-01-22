import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";
import type { VendorName } from "../types/api";
import { vendorNames } from "../types/api";

type Props = {
  children: ReactNode;
  vendorName: VendorName;
};

export const VendorNameContext = createContext<VendorName>("MCK");

const VendorNameProvider: FC<Props> = ({ children, vendorName }) => (
  <VendorNameContext.Provider value={vendorName}>
    {children}
  </VendorNameContext.Provider>
);

VendorNameProvider.propTypes = {
  children: PropTypes.node.isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(VendorNameProvider);
