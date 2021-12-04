export const getTransactions = (token) => {
  return {
    url: `/transactions/`,
    method: 'get',
    data: {
      params: {
        token
      },
    },
  }
}
