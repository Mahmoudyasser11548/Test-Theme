import React, { useContext } from "react";
// ** Third Party Components
import ReactCountryFlag from "react-country-flag";
// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import { useRTL } from "@hooks/useRTL";
import { IntlContext } from "../../../../utility/context/IntlProviderWrapper";
import { locales } from "@redux/SupportedLocales";

const IntlDropdown = () => {
  // ** Context
  const intlContext = useContext(IntlContext);
  // eslint-disable-next-line no-unused-vars
  const [isRtl, setValue] = useRTL();
  // ** Vars
  const langObj = locales;
  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault();
    intlContext.switchLanguage(lang);
    setValue(lang.isRTL);
  };
  if (Object.keys(locales).length <= 1) {
    return <></>;
  }
  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          className="country-flag flag-icon"
          countryCode={locales[intlContext.locale].flag}
          svg
        />
        <span className="selected-language">
          {langObj[intlContext.locale].name}
        </span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        {locales &&
          Object.keys(locales).map((key, i) => {
            return (
              <DropdownItem
                key={i}
                href="/"
                tag="a"
                onClick={(e) => handleLangUpdate(e, locales[key])}
              >
                <ReactCountryFlag
                  className="country-flag"
                  countryCode={locales[key].flag}
                  svg
                />
                <span className="ml-1 ms-1">{locales[key].name}</span>
              </DropdownItem>
            );
          })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
