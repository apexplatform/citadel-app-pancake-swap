export const deleteRestakeAddress = ({net,address}) => {
    return {
      url: `/${net}/${address}/restake`,
      method: 'delete'
    }
  }