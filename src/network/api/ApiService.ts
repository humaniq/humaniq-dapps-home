import buildUrl from 'build-url'

export const API_URL = "https://api.node.psec.pro";

export const ROUTES = {
  TX: {
    GET_TRANSACTION_DATA: "v1/api/node/:type/helper/transaction",
    SEND_TRANSACTION: "/v1/api/node/:type/broadcast/raw",
  },
  DAPP: {
    DAPP_PROFILE_UPDATE: "/v1/api/dapp/profile/update",
  },
};

const API_VERSION = 1

/**
 * Endpoints
 */
const ApiService =  {
  /**
   */
  updateProfile: () => buildUrl(`/api/v${ API_VERSION }/auth/login`)
}

export default ApiService