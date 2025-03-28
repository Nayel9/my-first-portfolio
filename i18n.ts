import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonFr from "./public/locales/fr/common.json";
import commonEn from "./public/locales/en/common.json";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "fr",
        lng: "fr",
        ns: ["common"],
        defaultNS: "common",
        resources: {
            fr: { common: commonFr },
            en: { common: commonEn }
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;