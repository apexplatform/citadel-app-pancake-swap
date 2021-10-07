export const prepareSwap = (data) => {
    return {
      url: `/transactions/${data.network}/${data.from}/prepare-swap`,
      method: 'post',
      data
    }
  }