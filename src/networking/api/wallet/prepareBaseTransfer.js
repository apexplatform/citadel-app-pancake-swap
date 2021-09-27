export const prepareBaseTransfer = (data) => {
  return {
    url: `/${data.network}/${data.from}/prepareTransfer`,
    method: 'post',
    data
  }
}