import {
  Collapse,
  Button,
  Row,
  Col,
  Fade,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { memo, useCallback, useState, FC } from "react";
import RemoveButton from "./RemoveButton";
import MinimizeButton from "./MinimizeButton";
import { itemInterface } from "../../../addedSlice";
import ColumnToggleButtonGroup from "./ColumnToggleButtonGroup";
import SingleVendorColumnModal from "./SingleVendorColumnModal";

interface Prop {
  itemObj: itemInterface;
  vendorName: string;
}

const SingleVendorColumnListItem: FC<Prop> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "c") {
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div
      key={`div-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded border mb-4">
      <Container
        key={`Container-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
        fluid
        className="my-3">
        <Row
          key={`Row-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
          className="justify-content-evenly align-items-center">
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-first`}
            xs={12}
            xl={7}
            xxl={9}
            className="">
            <Fade
              key={`Fade-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              in={!open}
              unmountOnExit>
              <Button
                key={`Button-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
                aria-controls="maximize content"
                variant="success"
                className="w-100"
                onClick={toggle}>
                {itemObj.name}
              </Button>
            </Fade>
          </Col>
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-second`}
            className=""
            xs={"auto"}>
            <ButtonGroup
              key={`ButtonGroup-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              className="my-2">
              <SingleVendorColumnModal
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <MinimizeButton
                key={`MinimizeButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
                open={open}
                toggle={toggle}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              <RemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`RemoveButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse
        key={`Collapse-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
        in={open}>
        <ColumnToggleButtonGroup itemObj={itemObj} vendorName={vendorName} />
      </Collapse>
    </div>
  );
};

export default memo(SingleVendorColumnListItem);
