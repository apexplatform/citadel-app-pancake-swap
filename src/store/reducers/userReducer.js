const qs = require('querystring');
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);
console.log(paramsAsObject.token,'--auth token')
console.log(paramsAsObject.wallets,'--wallets')
const initialState = {
    auth_token: paramsAsObject.token
}
export default function(state=initialState,action){
    switch (action.type){
        default:
            return state
    }
}