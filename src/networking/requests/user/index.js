import { utils } from '@citadeldao/apps-sdk';

const getUserConfig = (token) => {
    const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/configs?token=${token}`)
    return request
}

const setUserConfig = (token,config) => {
    const request = new utils.Request('put',`${process.env.REACT_APP_BACKEND_URL}/configs?token=${token}`, config)
    return request
}

const getSocketToken = () => {
    const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/api/profile/socket`)
    return request
}

export const user = {
    getUserConfig,
    setUserConfig,
    getSocketToken
}