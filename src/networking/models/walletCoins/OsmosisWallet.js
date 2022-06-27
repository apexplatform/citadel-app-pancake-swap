import Wallet from '../Wallet';
import { getApi } from '../../api/useApi';
import { store } from "../../../store/store";
import * as Sentry from "@sentry/react";
const api = getApi("wallet");
export default class OsmosisWallet extends Wallet {
    async getTokenBalance() {
        const { auth_token } = store.getState().user;
        const data = await api.getTokenBalance({
          network: this.net,
          address: this.address,
          token: auth_token,
        });
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