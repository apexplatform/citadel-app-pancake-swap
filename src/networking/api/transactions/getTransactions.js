export const getTransactions = (data) => {
  return {
    url: `/transactions`,
    method: 'get',
    data: {
      params: {
        token: data.auth_token
      },
    },
  }
}
