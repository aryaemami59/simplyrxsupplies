import { Collapse, Card, ListGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import {
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  Ref,
} from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { selectSidebarNavs, itemInterface } from "../../../addedSlice";
import { DarkMode, myContextInterface } from "../../../App";
import { useAppSelector } from "../../../data/store";
import { Transition } from "react-transition-group";

const COLLAPSED = "collapsed" as const;

interface Props {
  category: string;
}

const SideBarAccordion: FC<Props> = ({ category }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);

  const sidebarItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectSidebarNavs(category),
    shallowEqual
  );
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const nodeRef: Ref<Transition<any>> = useRef<null>(null);

  const toggle: MouseEventHandler<HTMLButtonElement> = useCallback((): void => {
    setOpen((prev: boolean): boolean => !prev);
  }, []);

  return (
    <div key={`div-SideBarAccordion-${category}-outer`}>
      <h2 key={`h2-SideBarAccordion-${category}`} className="accordion-header">
        <button
          key={`button-SideBarAccordion-${category}`}
          onClick={toggle}
          className={`accordion-button rounded ${
            darkTheme ? "custom-dark-mode" : "custom-light-mode"
          } ${open ? "" : COLLAPSED}`}>
          {category}
        </button>
      </h2>
      <Collapse
        key={`Collapse-SideBarAccordion-${category}`}
        in={open}
        ref={nodeRef}
        className="bg-gradient">
        <div key={`div-SideBarAccordion-${category}-inner`}>
          <Card
            key={`Card-SideBarAccordion-${category}`}
            className={`bg-gradient custom-dark-mode ${
              darkTheme ? "bg-dark" : "bg-light"
            }`}>
            <Card.Body
              key={`Card.Body-SideBarAccordion-${category}`}
              className={`bg-gradient custom-dark-mode ${
                darkTheme ? "bg-dark" : "bg-light"
              }`}>
              <ListGroup key={`ListGroup-SideBarAccordion-${category}`}>
                {sidebarItems.map(f => (
                  <SingleSideBarAccordionListItem
                    category={category}
                    itemObj={f}
                    key={`${f.name}-SingleSideBarAccordionListItem`}
                  />
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(SideBarAccordion);
