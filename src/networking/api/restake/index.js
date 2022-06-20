import { getNetworks } from './getNetworks';
import { getValidators } from './getValidators';
import { getDelegatorStatus } from './getDelegatorStatus';
import { getNetworkConfig } from './getNetworkConfig';
import { postPermissionRestake } from './postPermissionRestake';
import { getBalances } from './getBalances';
import { deleteRestakeAddress } from './deleteRestakeAddress'
export const restake = {
  getNetworks,
  getValidators,
  getDelegatorStatus,
  getNetworkConfig,
  postPermissionRestake,
  getBalances,
  deleteRestakeAddress
}