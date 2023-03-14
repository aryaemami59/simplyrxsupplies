import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IosShareIcon from "@mui/icons-material/IosShare";
import { IconButton } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import { shareOnMobile } from "react-mobile-share";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectAddedItemsByVendor,
  selectQRCodeContent,
} from "../../../Redux/selectors";

const startIcon = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? (
  <IosShareIcon fontSize="large" />
) : (
  <FontAwesomeIcon icon={faShareNodes} />
);

const ShareButton: FC = () => {
  const vendorName = useVendorName();
  const itemNames = useAppSelector(selectAddedItemsByVendor(vendorName));
  const text = itemNames.join(", ");
  const title = `QR Code for items:\n${text}`;
  const qrContent = useAppSelector(selectQRCodeContent(vendorName));

  const data: Parameters<typeof shareOnMobile>[0] = useMemo(
    () => ({
      title,
      images: [qrContent],
      text,
    }),
    [qrContent, text, title]
  );

  const clickHandler = useCallback(() => {
    shareOnMobile(data);
  }, [data]);

  return (
    <IconButton
      onClick={clickHandler}
      className="d-inline-block w-auto"
      size="large"
      color="inherit">
      {startIcon}
    </IconButton>
  );
};

export default memo(ShareButton);
