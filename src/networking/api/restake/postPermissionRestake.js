export const postPermissionRestake = ({net,address,transaction}) => {
    return {
      url: `/${net}/${address}/permission`,
      method: 'post',
      data: transaction
    }
  }