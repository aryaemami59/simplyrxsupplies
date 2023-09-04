import PropTypes from "prop-types";
import type { FC } from "react";
import { createContext, memo } from "react";

import type { PropsWithRequiredChildren } from "../types/tsHelpers";

type Props = PropsWithRequiredChildren<{
  readonly vendorId: number;
}>;

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
