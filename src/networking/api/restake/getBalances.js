export const getBalances = ({net,address}) => {
    return {
      url: `/${net}/${address}/stats`,
      method: 'get',
    }
  }
  