// ** React Imports
import { NavLink } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useLingui } from "@lingui/react";

const HorizontalNavMenuLink = ({ item, isChild, setMenuOpen }) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? "a" : NavLink;

  // ** Hooks
  const { i18n } = useLingui();

  const handleClick = () => {
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={classnames("nav-item", {
        disabled: item.disabled,
      })}
    >
      <LinkTag
        className={classnames("d-flex align-items-center", {
          "dropdown-item": isChild,
          "nav-link": !isChild,
        })}
        target={item.newTab ? "_blank" : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              className: ({ isActive }) => {
                const commonClass = "d-flex align-items-center";
                if (isActive && !item.disabled && item.navLink !== "#") {
                  if (isChild) {
                    return `${commonClass} dropdown-item active`;
                  } else {
                    return `${commonClass} nav-link active`;
                  }
                } else {
                  if (isChild) {
                    return `${commonClass} dropdown-item`;
                  } else {
                    return `${commonClass} nav-link`;
                  }
                }
              },
            })}
        /*eslint-enable */
      >
        {item.icon}
        <span>{i18n._(item.title)}</span>
      </LinkTag>
    </li>
  );
};

export default HorizontalNavMenuLink;
