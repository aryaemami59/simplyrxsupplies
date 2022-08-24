import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Row } from "react-bootstrap";
import { memo, useCallback } from "react";
import InputListItems from "./InputListItems";
import InputFieldComponent from "./InputFieldComponent";
import { useDispatch, useSelector } from "react-redux";
import { compactSearchResults, } from "../../../addedSlice";
function InputGroupComponent() {
    const dispatch = useDispatch();
    const ifCompact = useSelector((state) => state.added.compact);
    // const vendors = useSelector(selectAllVendorOfficialNames);
    // const vendorsFirst = vendors.slice(0, 4);
    // const vendorsSecond = vendors.slice(4, 8);
    const clickHandler = useCallback(() => {
        dispatch(compactSearchResults());
    }, [dispatch]);
    return (<>
      <Row className="justify-content-center mb-3">
        <Button onClick={clickHandler} className="w-auto">
          {ifCompact ? "Show" : "Hide"} compact view of the search results
        </Button>
      </Row>
      <div key={`div-row-InputGroupComponent`} className="row justify-content-center">
        <div key={`div-col-InputGroupComponent`} className="col-12 col-md-11 col-lg-11 col-xxl-10 justify-content-center">
          <Form.Floating key={`Form.Floating-InputGroupComponent`}>
            <InputFieldComponent key={`InputFieldComponent-InputGroupComponent`}/>
            <label className="w-auto h-auto ps-4 text-white-50" htmlFor="floatingInputCustom" key={`label-InputGroupComponent`}>
              Search...
            </label>
            <FontAwesomeIcon key={`FontAwesomeIcon-InputGroupComponent-searchIcon`} className="rounded-circle p-2 position-absolute top-0 end-0 me-1 mt-1 text-white-50" role="search" size="2x" icon={faMagnifyingGlass}/>
          </Form.Floating>
          <InputListItems key={`InputListItems-InputGroupComponent`}/>
        </div>
      </div>
      {/* <Row className="text-white justify-content-cente align-items-cente">
          Filter the search results By:
          <ButtonToolbar className="text-white">
            <ButtonGroup vertical size="sm" className="text-white">
              {vendorsFirst.map(e => (
                <Button>{e}</Button>
              ))}
            </ButtonGroup>
            <ButtonGroup vertical size="sm" className="text-white">
              {vendorsSecond.map(e => (
                <Button>{e}</Button>
              ))}
            </ButtonGroup>
          </ButtonToolbar>
        </Row> */}
    </>);
}
export default memo(InputGroupComponent);
