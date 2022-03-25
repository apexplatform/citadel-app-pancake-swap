import { rewards } from './rewards';
import { transactions } from './transactions';
import { swap } from './swap';
import { bridge } from './bridge';
import { wallet } from './wallet';
import { auth } from './auth/';
import { socket } from '../socket/calls'
export const apies = {
  swap,
  rewards,
  transactions,
  bridge,
  wallet,
  auth,
  socket
};