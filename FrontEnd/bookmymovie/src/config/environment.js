export const ENVIRONMENT = process.env.REACT_APP_ENV;

export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const SERVICING_URL = process.env.REACT_APP_SERVICING_URL;
export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const DEBUG = {
  LOG_ENABLED: process.env.REACT_APP_LOG_ENABLED === "true",
  DEV_TOOLS_ENABLED: process.env.REACT_APP_ENABLE_DEV_TOOLS === "true",
};
