import {
  Collapse,
  Button,
  Row,
  Col,
  Fade,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { memo, useCallback, useState, FC, KeyboardEvent } from "react";
import RowRemoveButton from "./RowRemoveButton";
import MinimizeButton from "./MinimizeButton";
import RowSingleItemInfo from "./RowSingleItemInfo";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainer: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const [open, setOpen] = useState(true);
  const { name } = itemObj;

  const toggleFade = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "c") {
        toggleFade();
      }
    },
    [toggleFade]
  );

  return (
    <div
      key={`div-SingleVendorColumnListItem-${vendorName}-${name}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded border mb-4">
      <Container
        key={`Container-SingleVendorColumnListItem-${vendorName}-${name}`}
        fluid
        className="my-3">
        <Row
          key={`Row-SingleVendorColumnListItem-${vendorName}-${name}`}
          className="justify-content-evenly align-items-center">
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${name}-first`}
            xs={12}
            xl={7}
            xxl={9}
            className="">
            <Fade
              key={`Fade-SingleVendorColumnListItem-${vendorName}-${name}`}
              in={!open}
              unmountOnExit>
              <Button
                key={`Button-SingleVendorColumnListItem-${vendorName}-${name}`}
                aria-controls="maximize content"
                variant="success"
                className="w-100"
                onClick={toggleFade}>
                {name}
              </Button>
            </Fade>
          </Col>
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${name}-second`}
            className=""
            xs={"auto"}>
            <ButtonGroup
              key={`ButtonGroup-SingleVendorColumnListItem-${vendorName}-${name}`}
              className="my-2">
              <RowSingleContainerModal
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <MinimizeButton
                key={`MinimizeButton-SingleVendorColumnListItem-${vendorName}-${name}`}
                open={open}
                toggle={toggleFade}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              <RowRemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`RemoveButton-SingleVendorColumnListItem-${vendorName}-${name}`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse
        key={`Collapse-SingleVendorColumnListItem-${vendorName}-${name}`}
        in={open}>
        <div>
          <RowSingleItemInfo
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(RowSingleContainer);
