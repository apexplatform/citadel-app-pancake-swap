import { utils } from '@citadeldao/apps-sdk';

const getNetworks = () => {
  const request = new utils.Request('get',`${process.env.REACT_APP_RESTAKE_URL}/networks`)
  return request
}

const getValidators = ({net,address}) => {
  const request = new utils.Request('get',`${process.env.REACT_APP_RESTAKE_URL}/${net}/${address}/stake-list`)
  return request
}

const getDelegatorStatus = ({net,address}) => {
  const request = new utils.Request('get',`${process.env.REACT_APP_RESTAKE_URL}/${net}/${address}/status`)
  return request
}

const getNetworkConfig = (net) => {
  const request = new utils.Request('get',`${process.env.REACT_APP_RESTAKE_URL}/${net}/config`)
  return request
}

const getBalances = ({net,address}) => {
  const request = new utils.Request('get',`${process.env.REACT_APP_RESTAKE_URL}/${net}/${address}/stats`)
  return request
}


const postPermissionRestake = ({net,address,transaction}) => {
  const request = new utils.Request('post',`${process.env.REACT_APP_RESTAKE_URL}/${net}/${address}/permission`, {data: transaction})
  return request
}

const deleteRestakeAddress = ({net,address}) => {
  const request = new utils.Request('delete',`${process.env.REACT_APP_RESTAKE_URL}/${net}/${address}/restake`)
  return request
}

export const restake = {
  getNetworks,
  getValidators,
  getDelegatorStatus,
  getNetworkConfig,
  postPermissionRestake,
  getBalances,
  deleteRestakeAddress
}