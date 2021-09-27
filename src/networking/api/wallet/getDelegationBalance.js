export const getDelegationBalance = (data) => {
    return {
      url: `/transactions/${data.network}/${data.address}/delegation-balance-info`,
      method: 'get',
    }
  }
  