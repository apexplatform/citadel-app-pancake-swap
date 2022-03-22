import { rewards } from './rewards';
import { transactions } from './transactions';
import { swap } from './swap';
import { bridge } from './bridge';
import { wallet } from './wallet';
import { socket } from '../socket/calls'
import { auth } from './auth/';
export const apies = {
  swap,
  rewards,
  transactions,
  bridge,
  wallet,
  auth,
  socket
};