export const API_HUMANIQ_URL = "https://signupbot.humaniq.com/api/v1";
export const API_HUMANIQ_TOKEN = "XMaLhU75ZFklvAiV7yBZBNnlWsE9IowU";

export const HUMANIQ_ROUTES = {
  INTROSPECT: {
    POST_SIGNUP_CHECK: "/introspect/signup/check",
    POST_SIGNUP_CONFIRM: "/introspect/signup/confirm",
    GET_SIGNUP_OBJECT: "/introspect/signup/object/:uid",
    GET_SIGNUP_PHOTO: "/introspect/signup/photo/:uid",
    GET_SIGNUP_WALLET: "/introspect/signup/wallet/:wallet",
  },
  DAPP: {
    POST_PROFILE_UPDATE: "/dapp/profile/update",
  },
};
