export const getValidators = ({net,address}) => {
    return {
      url: `/${net}/${address}/stake-list`,
      method: 'get',
    }
  }
  