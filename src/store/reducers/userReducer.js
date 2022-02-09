const qs = require('querystring');
const params = window.location.search.slice(1);
const paramsAsObject = qs.parse(params);
const token = JSON.parse(paramsAsObject.token);
const initialState = {
    auth_token: token?.token || token
}
export default function(state=initialState,action){
    switch (action.type){
        default:
            return state
    }
}
