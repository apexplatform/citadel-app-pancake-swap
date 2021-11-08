import { createReducer } from '@reduxjs/toolkit'
import { DEFAULT_ACTIVE_LIST_URLS, UNSUPPORTED_LIST_URLS, DEFAULT_LIST_OF_LISTS } from '../../networking/constants/constants'

import { UPDATE_VERSION, ADD_LIST, REMOVE_LIST, ENABLE_LIST, DISABLE_LIST, ACCEPT_LIST_UPDATE } from '../actions/types'

const NEW_LIST_STATE = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null,
}
const initialState = {
  lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUrl: {
    ...DEFAULT_LIST_OF_LISTS.concat(...UNSUPPORTED_LIST_URLS).reduce((memo, listUrl) => {
      memo[listUrl] = NEW_LIST_STATE
      return memo
    }, {}),
  },
  activeListUrls: DEFAULT_ACTIVE_LIST_URLS,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(ADD_LIST, (state, { payload: url }) => {
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE
      }
    })
    .addCase(REMOVE_LIST, (state, { payload: url }) => {
      if (state.byUrl[url]) {
        delete state.byUrl[url]
      }
      // remove list from active urls if needed
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url)
      }
    })
    .addCase(ENABLE_LIST, (state, { payload: url }) => {
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE
      }

      if (state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url)
      }

      if (!state.activeListUrls) {
        state.activeListUrls = [url]
      }
    })
    .addCase(DISABLE_LIST, (state, { payload: url }) => {
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url)
      }
    })
    .addCase(ACCEPT_LIST_UPDATE , (state, { payload: url }) => {
      if (!state.byUrl[url]?.pendingUpdate) {
        throw new Error('accept list update called without pending update')
      }
      state.byUrl[url] = {
        ...state.byUrl[url],
        pendingUpdate: null,
        current: state.byUrl[url].pendingUpdate,
      }
    })
    .addCase(UPDATE_VERSION, (state) => {
      // state loaded from localStorage, but new lists have never been initialized
      if (!state.lastInitializedDefaultListOfLists) {
        state.byUrl = initialState.byUrl
        state.activeListUrls = initialState.activeListUrls
      } else if (state.lastInitializedDefaultListOfLists) {
        const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce(
          (s, l) => s.add(l),
          new Set(),
        )
        const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), new Set())

        DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
          if (!lastInitializedSet.has(listUrl)) {
            state.byUrl[listUrl] = NEW_LIST_STATE
          }
        })

        state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
          if (!newListOfListsSet.has(listUrl)) {
            delete state.byUrl[listUrl]
          }
        })
      }

      state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS

      // if no active lists, activate defaults
      if (!state.activeListUrls) {
        state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS

        // for each list on default list, initialize if needed
        DEFAULT_ACTIVE_LIST_URLS.map((listUrl) => {
          if (!state.byUrl[listUrl]) {
            state.byUrl[listUrl] = NEW_LIST_STATE
          }
          return true
        })
      }
    }),
)
