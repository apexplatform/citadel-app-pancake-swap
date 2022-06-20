export const getNetworkConfig = (net) => {
    return {
      url: `/${net}/config`,
      method: 'get',
    }
  }
  