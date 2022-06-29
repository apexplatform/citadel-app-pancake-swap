import Wallet from '../Wallet';
import { getRequest } from '../../requests/getRequest';
import { store } from "../../../store/store";
import * as Sentry from "@sentry/react";
import { utils } from '@citadeldao/apps-sdk';
const requestManager = new utils.RequestManager()
const walletRequest = getRequest("wallet");
export default class OsmosisWallet extends Wallet {
    async getTokenBalance() {
        const { auth_token } = store.getState().user;
        const data = await requestManager.send(walletRequest.getTokenBalance({
          network: this.net,
          address: this.address,
          token: auth_token,
        }));
        if (data.ok) {
          return data;
        } else {
          Sentry.captureException(
            data.error?.message || data.error?.message?.stack
          );
          return new Error(data.error?.message);
        }
      }
}