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
  PHOTO: {
    POST_PHOTO: "/photo/upload",
  },
};

export const rpc = {
  1: "https://mainnet.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  3: "https://ropsten.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  4: "https://rinkeby.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  5: "https://goerli.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org",
};
