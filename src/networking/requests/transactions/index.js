import { utils } from '@citadeldao/apps-sdk';

const getTransactions = (data) => {
  let config = {
    params: {
      token: data.auth_token
    }
  }
  const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/transactions/${data.net}/${data.address}`, config)
  return request
}

export const transactions = {
  getTransactions,
};
