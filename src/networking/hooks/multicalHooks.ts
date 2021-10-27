import { BigNumber } from '@ethersproject/bignumber'
import { Interface, FunctionFragment } from '@ethersproject/abi'
export interface Result extends ReadonlyArray<any> {
   [key: string]: any
  }
  interface CallState {
    valid: boolean,
    // the result, or undefined if loading or errored/no data
    result: Result | undefined,
    // true if the result has never been fetched
    loading: boolean,
    // true if the result is not for the latest block
    syncing: boolean,
    // true if the call was made and is synced, but the return data is invalid
    error: boolean
  }

type MethodArg = string | number | BigNumber
type MethodArgs = Array<MethodArg | MethodArg[]>
interface CallResult {
    valid: boolean,
    data: string | undefined,
    blockNumber: number | undefined
  }
  
const INVALID_RESULT: CallResult = { valid: false, blockNumber: undefined, data: undefined }
const INVALID_CALL_STATE: CallState = { valid: false, result: undefined, loading: false, syncing: false, error: false }
const LOADING_CALL_STATE: CallState = { valid: true, result: undefined, loading: true, syncing: true, error: false }
type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined
export enum PairState {
	LOADING,
	NOT_EXISTS,
	EXISTS,
	INVALID,
  }
export function toCallState(
    callResult: CallResult | undefined,
    contractInterface: any,
    fragment: FunctionFragment | undefined,
    latestBlockNumber: number,
  ): CallState {
    if (!callResult) return INVALID_CALL_STATE
    const { valid, data, blockNumber } = callResult
    if (!valid) return INVALID_CALL_STATE
    if (valid && !blockNumber) return LOADING_CALL_STATE
    const success = data && data.length > 2
    const syncing = (blockNumber ?? 0) < latestBlockNumber
    let result: Result | undefined
    if (success && data) {
      try {
        result = contractInterface.decodeFunctionResult(fragment, data)
      } catch (error) {
        console.debug('Result data parsing failed', fragment, data)
        return {
          valid: true,
          loading: false,
          error: true,
          syncing,
          result,
        }
      }
    }
    return {
      valid: true,
      loading: false,
      syncing,
      result,
      error: !success,
    }
  }
function isMethodArg(x: unknown): any {
    return ['string', 'number'].indexOf(typeof x) !== -1
}
export function isValidMethodArgs(x: unknown): any {
    return (
    x === undefined ||
    (Array.isArray(x) && x.every((xi) => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
    )
}

