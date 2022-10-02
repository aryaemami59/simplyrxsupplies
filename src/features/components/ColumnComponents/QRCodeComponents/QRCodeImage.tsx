import { memo, FC } from "react";
import QRCode from "qrcode";
import { selectQRCodeContent } from "../../../../Redux/addedSlice";
import PrintIconQRCode from "./PrintIconQRCode";
import { Col, Container, Row } from "react-bootstrap";
import QRCodeModal from "./QRCodeModal";
import { useAppSelector } from "../../../../Redux/hooks";
import { vendorNameType } from "../../../../customTypes/types";

type Props = {
  vendorName: vendorNameType;
};

const QRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers: string = useAppSelector(selectQRCodeContent(vendorName));

  let src: string = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
    src = url;
  });

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={12} className="position-relative">
          <Row className="justify-content-center">
            <PrintIconQRCode
              vendorName={vendorName}
              src={src}
              text={"Print The QRCode"}
              key={`${vendorName}-PrintIconQRCodeComponent-QRCodeImageComponent`}
            />
            <QRCodeModal
              src={src}
              vendorName={vendorName}
              itemNumbers={itemNumbers}
            />
          </Row>
          <Row className="justify-content-center">
            <img
              src={src}
              className="my-4 w-auto p-0"
              alt={`${vendorName}-QRCode`}
              key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
              title={itemNumbers}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default memo<Props>(QRCodeImage);
