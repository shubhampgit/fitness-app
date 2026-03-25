import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from './locales/en/common.json';
import enHome from "./locales/en/home.json";
import enDashboard from './locales/en/dashboard.json';
import enMembership from './locales/en/membership.json';
import enPlanDetails from './locales/en/planDetails.json';
import enPayment from './locales/en/payment.json';
import enPaymentSuccess from './locales/en/paymentSuccess.json';

import hiCommon from './locales/hi/common.json';
import hiHome from './locales/hi/home.json';
import hiDashboard from './locales/hi/dashboard.json';
import hiMembership from './locales/hi/membership.json';
import hiPlanDetails from './locales/hi/planDetails.json';
import hiPayment from './locales/hi/payment.json';
import hiPaymentSuccess from './locales/hi/paymentSuccess.json';

import mrCommon from './locales/mr/common.json';
import mrHome from './locales/mr/home.json';
import mrDashboard from './locales/mr/dashboard.json';
import mrMembership from './locales/mr/membership.json';
import mrPlanDetails from './locales/mr/planDetails.json';
import mrPayment from './locales/mr/payment.json';
import mrPaymentSuccess from './locales/mr/paymentSuccess.json';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frDashboard from './locales/fr/dashboard.json';
import frMembership from './locales/fr/membership.json';
import frPlanDetails from './locales/fr/planDetails.json';
import frPayment from './locales/fr/payment.json';
import frPaymentSuccess from './locales/fr/paymentSuccess.json';

import arCommon from './locales/ar/common.json';
import arHome from './locales/ar/home.json';
import arDashboard from './locales/ar/dashboard.json';
import arMembership from './locales/ar/membership.json';
import arPlanDetails from './locales/ar/planDetails.json';
import arPayment from './locales/ar/payment.json';
import arPaymentSuccess from './locales/ar/paymentSuccess.json';


const savedLang = localStorage.getItem("lang") || "en";

i18n
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        common: enCommon,
        home: enHome,
        dashboard: enDashboard,
        membership: enMembership,
        planDetails: enPlanDetails,
        payment: enPayment,
        paymentSuccess: enPaymentSuccess
      },

      hi: {
        common: hiCommon,
        home: hiHome,
        dashboard: hiDashboard,
        membership: hiMembership,
        planDetails: hiPlanDetails,
        payment: hiPayment,
        paymentSuccess: hiPaymentSuccess
      },

      mr: {
        common: mrCommon,
        home: mrHome,
        dashboard: mrDashboard,
        membership: mrMembership,
        planDetails: mrPlanDetails,
        payment: mrPayment,
        paymentSuccess: mrPaymentSuccess
      },

      fr: {
        common: frCommon,
        home: frHome,
        dashboard: frDashboard,
        membership: frMembership,
        planDetails: frPlanDetails,
        payment: frPayment,
        paymentSuccess: frPaymentSuccess
      },

      ar: {
        common: arCommon,
        home: arHome,
        dashboard: arDashboard,
        membership: arMembership,
        planDetails: arPlanDetails,
        payment: arPayment,
        paymentSuccess: arPaymentSuccess
      }
    }
  });

export default i18n;