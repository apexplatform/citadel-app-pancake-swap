export const prepareBaseTransfer = (transaction) => {
  return {
    url: `/${data.network}/${data.from}/prepareTransfer`,
    method: 'post',
    data: transaction
  }
}