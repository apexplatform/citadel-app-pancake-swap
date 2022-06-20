export const getDelegatorStatus = ({net,address}) => {
    return {
      url: `/${net}/${address}/status`,
      method: 'get',
    }
  }
  