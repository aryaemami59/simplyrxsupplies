import PropTypes from "prop-types";
import { createContext, FC, memo, ReactNode } from "react";
import { VendorNameType, vendorNames } from "../custom_types/api";

type Props = {
  children: ReactNode;
  vendorName: VendorNameType;
};

export const VendorNameContext = createContext<VendorNameType>("MCK");

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
