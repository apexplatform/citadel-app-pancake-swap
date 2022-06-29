import { utils } from '@citadeldao/apps-sdk';

const getAccessToken = () => {
    const request = new utils.Request('get',`${process.env.REACT_APP_BACKEND_URL}/get-access-token`)
    return request
}

export const auth = {
    getAccessToken
}