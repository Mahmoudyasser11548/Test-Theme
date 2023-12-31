import React, { createContext, useEffect, useState } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useDispatch } from "react-redux";
import { locales } from "@redux/SupportedLocales";
import { changeLocale } from "@redux/app";
// Context
export const IntlContext = createContext();

// Activate the language dynamically
async function dynamicActivate(locale) {
  const { messages } = await import(`../../locales/${locale}.po`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

const IntlProviderWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const [locale, setLocale] = useState("en");
  const lang = localStorage.getItem("language");

  const currentLang = lang
    ? locales[lang]
    : Object.values(locales).find((l) => l.default);

  useEffect(() => {
    setLocale(currentLang.code);
  }, []);

  useEffect(() => {
    dispatch(changeLocale({ code: currentLang.code }));
    dynamicActivate(currentLang.code);
  }, []);

  // Switches Language
  const switchLanguage = (lang) => {
    setLocale(lang.code);
    dispatch(changeLocale(lang));
    dynamicActivate(lang.code);
  };

  return (
    <IntlContext.Provider value={{ locale, switchLanguage }}>
      <I18nProvider i18n={i18n}> {children} </I18nProvider>
    </IntlContext.Provider>
  );
};
export default IntlProviderWrapper;
