export const getTransactions = ({ net, address }) => {
  let url = () => {
    if (net) {
      if (address) {
        url = `/transactions/${net}/${address}`
      } else {
        url = `/transactions/${net}`
      }
    } else {
      url = '/transactions'
    }
    return url
  }
  return {
    url: url(),
    method: 'get',
  }
}
