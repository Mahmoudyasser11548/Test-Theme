import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_LOCALE,
  DEFAULT_DIRECTION,
  DEFAULT_CURRENCY,
} from "./constant";
import { locales } from "./SupportedLocales";

const initialState = {
  supportedLocales: locales,
  locale: locales[DEFAULT_LOCALE],
  direction: DEFAULT_DIRECTION,
  defaultCurrency: DEFAULT_CURRENCY,
  priceDisplay: "baseprice", //allawed values: baseprice, fees, prepayamount, totalamount
  lastPing: "",
  layout: "vertical", // options[String]: "vertical"(default), "horizontal"
  theme: "light", // options[String]: 'light'(default), 'dark', 'semi-dark'
  sidebarCollapsed: false, // options[Boolean]: true, false(default)
  navbarColor: "default", // options[String]: default / primary / success / danger / info / warning / dark
  navbarType: "floating", // options[String]: floating(default) / static / sticky / hidden
  footerType: "static", // options[String]: static(default) / sticky / hidden
  disableCustomizer: true, // options[Boolean]: true, false(default)
  hideScrollToTop: false, // options[Boolean]: true, false(default)
  menuTheme: "primary", // options[String]: primary / success / danger / info / warning / dark
};

const app = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    changeLocale: (state, action) => {
      const locale = action.payload;
      let _locale = locales[locale.code];
      if (!_locale) _locale = locales[DEFAULT_LOCALE];

      state.locale = _locale;
      state.direction =
        _locale.direction.toLowerCase() === "rtl" ? "rtl" : "ltr";
      window.localStorage.setItem("culture", _locale.code);
      window.localStorage.setItem("language", _locale.code);
      window.localStorage.setItem("cultureCode", _locale.culture);
      window.localStorage.setItem("isRTL", _locale.isRTL);
      window.localStorage.setItem("direction", _locale.isRTL);

      document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", _locale.direction);
      document
        .getElementsByTagName("body")[0]
        .setAttribute("dir", _locale.direction);
      document
        .getElementsByTagName("body")[0]
        .setAttribute("direction", _locale.direction);
      document.getElementsByTagName("body")[0].style.direction =
        _locale.direction;
      document.getElementsByTagName("body")[0].style.textAlign =
        _locale.direction === "RTL" ? "right" : "unset";
    },
  },
});

export const { changeLocale } = app.actions;
export default app.reducer;
