import { types } from './types';
import axios from "axios";
import { store } from '../store'
const setAuthToken = (token) => ({
    type: types.SET_OPENED_TRANSACTION,
    payload: token
});

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

const loadSocketToken = () => (dispatch) => {
    try {
      axiosInstance.get('/api/profile/socket').then((res) => {
        dispatch({
          type: types.SET_SOCKET_TOKEN,
          payload: res.data?.data,
        })
      });
    } catch {}
  };

const loadUserConfig = () => (dispatch) => {
  const {auth_token} = store.getState().user
  try {
    axiosInstance.get('/configs?token=' + auth_token).then((res) => {
      dispatch({
        type: types.SET_USER_CONFIG,
        payload: res.data.data && JSON.parse(res.data?.data),
      })
    });
  } catch {}
};

const setUserConfig = (config=null) => {
  const {auth_token} = store.getState().user
  const data = { config }
  try {
    axiosInstance.put('/configs?token=' + auth_token, data).then((res) => {
      console.log(res,'--res')
    });
  } catch {}
};

export const usersActions = {
    setAuthToken,
    loadSocketToken,
    loadUserConfig,
    setUserConfig
};