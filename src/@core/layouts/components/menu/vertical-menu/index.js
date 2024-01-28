/* eslint-disable quote-props */
/* eslint-disable implicit-arrow-linebreak */
// ** React Imports
import { Fragment, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";

const Sidebar = (props) => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props;

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [navItems, setNavItems] = useState([]);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };

  const filterNavItems = (value) => {
    const allItems = [...menuData];

    if (!value) setNavItems(allItems);
    else setNavItems(allItems.filter((item) => item?.id?.includes(value)));
  };

  return (
    <Fragment>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark",
          },
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <div className="text-center mx-2 my-1">
                <div className="p-inputgroup flex-1 search-menu">
                  {!menuCollapsed && (
                    <InputText
                      placeholder={"Keyword"}
                      onChange={(e) =>
                        filterNavItems(e.target.value.toLowerCase())
                      }
                    />
                  )}
                  <Button
                    icon="pi pi-search"
                    className="p-button-warning btn-icon"
                  />
                </div>
              </div>
              <ul className="navigation navigation-main">
                <VerticalNavMenuItems
                  items={navItems && navItems?.length > 0 ? navItems : menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
