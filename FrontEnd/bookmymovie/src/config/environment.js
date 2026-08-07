export const ENVIRONMENT = process.env.REACT_APP_ENV;

export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const SERVICING_URL = process.env.REACT_APP_SERVICING_URL;

export const DEBUG = {
  LOG_ENABLED: process.env.REACT_APP_LOG_ENABLED === "true",
  DEV_TOOLS_ENABLED: process.env.REACT_APP_ENABLE_DEV_TOOLS === "true",
};
