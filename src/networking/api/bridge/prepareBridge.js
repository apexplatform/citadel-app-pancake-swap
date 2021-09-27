export const prepareBridge = (data) => {
    return {
      url: `/transactions/${data.network}/${data.from}/prepare-bridge`,
      method: 'post',
      data
    }
  }