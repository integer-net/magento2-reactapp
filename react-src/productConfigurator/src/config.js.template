/**
 * in development (npm run start) we use the PROXY env value, configured in .env.development
 * so make sure that file exists (see .env.development.example)
 * If the variable `REACT_APP_PROXY` is not set, it will use the fallback
 *
 * in production (npm run build) we use base_url from magento, set directly in <head><script>,
 * or if that's not found, it will use the hardcoded fallback
 */
const isDevelopment = !!process.env.REACT_APP_PROXY;

const baseUrl = isDevelopment
  ? '/'
  : window.BASE_URL || 'https://magento.test/';

const config = {
  baseUrl
};

export default config;
