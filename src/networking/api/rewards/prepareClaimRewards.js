export const prepareClaimRewards = (data) => {
  return {
    url: `/transactions/${data.net}/${data.address}/prepare-claim-reward`,
    method: 'post',
  }
}