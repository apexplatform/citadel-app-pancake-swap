import { types } from '../actions/types'
import { createReducer } from '@reduxjs/toolkit'
import {toCallKey} from '../../networking/methods/swap'
const initialState = {
    callResults: [],
    callListeners: null,
    calls: []
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(types.ADD_MULTICAL_LISTENERS, (state, { payload: { chainId, call,  options: { blocksPerFetch = 1 } = {} } }) => {
      const listeners = state.callListeners
        ? state.callListeners
        : (state.callListeners = {})
      listeners[chainId] = listeners[chainId] ?? {}
      call.forEach((call) => {
        const callKey = toCallKey(call)
        listeners[chainId][callKey] = listeners[chainId][callKey] ?? {}
        listeners[chainId][callKey][blocksPerFetch] = (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1
      })
    })
    .addCase(
      types.REMOVE_MULTICAL_LISTENERS,
      (state, { payload: { chainId, calls, options: { blocksPerFetch = 1 } = {} } }) => {
        const listeners = state.callListeners
          ? state.callListeners
          : (state.callListeners = {})

        if (!listeners[chainId]) return
        calls.forEach((call) => {
          const callKey = toCallKey(call)
          if (!listeners[chainId][callKey]) return
          if (!listeners[chainId][callKey][blocksPerFetch]) return

          if (listeners[chainId][callKey][blocksPerFetch] === 1) {
            delete listeners[chainId][callKey][blocksPerFetch]
          } else {
            listeners[chainId][callKey][blocksPerFetch]--
          }
        })
      },
    )
    .addCase(types.FETCHING_MULTICAL_RESULTS, (state, { payload: { chainId, fetchingBlockNumber, calls } }) => {
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        const current = state.callResults[chainId][callKey]
        if (!current) {
          state.callResults[chainId][callKey] = {
            fetchingBlockNumber,
          }
        } else {
          if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return
          state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber
        }
      })
    })
    .addCase(types.ERROR_FETCHINT_MULTICAL_RESULTS, (state, { payload: { fetchingBlockNumber, chainId, calls } }) => {
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        const current = state.callResults[chainId][callKey]
        if (!current) return // only should be dispatched if we are already fetching
        if (current.fetchingBlockNumber === fetchingBlockNumber) {
          delete current.fetchingBlockNumber
          current.data = null
          current.blockNumber = fetchingBlockNumber
        }
      })
    })
    .addCase(types.UPDATE_MULTICAL_RESULTS, (state, { payload: { chainId, results, blockNumber } }) => {
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      Object.keys(results).forEach((callKey) => {
        const current = state.callResults[chainId][callKey]
        if ((current?.blockNumber ?? 0) > blockNumber) return
        state.callResults[chainId][callKey] = {
          data: results[callKey],
          blockNumber,
        }
      })
    })
    .addCase(types.SET_CALLS, (state, { payload: { calls } }) => {
      state.calls = calls
    }),
)
