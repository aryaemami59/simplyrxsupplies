import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import type { FC, MouseEventHandler } from "react";
import { memo } from "react";

const startIcon = <FontAwesomeIcon icon={faShoppingCart} />;

type Props = {
  showModal: MouseEventHandler<HTMLButtonElement>;
};

const DisplayCartButton: FC<Props> = ({ showModal }) => (
  <IconButton
    onClick={showModal}
    className="d-inline-block d-md-none">
    {startIcon}
  </IconButton>
);

export default memo<Props>(DisplayCartButton);
