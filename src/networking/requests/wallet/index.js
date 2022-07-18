import { utils } from '@citadeldao/apps-sdk';

const getWalletBalance = (data) => {
  const config = {
    params: {
      token: data.token
    }
  }
  const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/${data.network}/${data.address}/wallets/balance`,config)
  return request
}

const getAllTokenBalance = (data) => {
  const config = {
    params: {
      token: data.token
    }
  }
  const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/${data.network}/${data.address}/wallets/allTokenBalance`,config)
  return request
}

const prepareBaseTransfer = (data) => {
  const config = {
      data: data.transaction
  }
  const request = new utils.Request('post',`${process.env.REACT_APP_BACKEND_URL}/${data.network}/${data.from}/prepareCustomTransaction`,config)
  return request
}

const getStakeNodes = () => {
  const request = new utils.Request('get', process.env.REACT_APP_MAIN_SERVER_URL + '/staking-node?version=1.0.4')
  return request
}

const getNetworks = () => {
  const request = new utils.Request('get', process.env.REACT_APP_MAIN_SERVER_URL + '/networks.json')
  return request
}

export const wallet = {
  getWalletBalance,
  prepareBaseTransfer,
  getStakeNodes,
  getNetworks,
  getAllTokenBalance
}