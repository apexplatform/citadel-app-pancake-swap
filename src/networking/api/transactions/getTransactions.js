export const getTransactions = (data) => {
  return {
    url: `/transactions/${data.net}/${data.address}`,
    method: 'get',
    data: {
      params: {
        token: data.auth_token,
        limit: 99,
        offset: 0
      },
    },
  }
}
