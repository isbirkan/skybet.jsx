import React from 'react';
import * as actions from '../constants/actions';

export const initialState = {
  liveEvents: [],
  events: [],
  markets: [],
  outcomes: [],
  options: {
    marketsViewType: 'infinite',
    format: 'decimal',
    marketsPage: 1,
    marketsResultsPerPage: 10,
    primaryMarket: true
  },
  loading: true,
  error: null
};

export function appReducer(state, [type, payload]) {
  switch (type) {
    case actions.INIT:
      return {
        ...state,
        loading: false,
        error: null
      };
    case actions.LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.LIVE_EVENTS:
      return {
        ...state,
        liveEvents: payload,
        loading: false,
        error: null
      };
    case actions.EVENT_DATA:
      return {
        ...state,
        events: [...state.events.filter(e => e.eventId !== payload.eventId), payload],
        loading: false,
        error: null
      };
    case actions.MARKET:
      return {
        ...state,
        markets: [...state.markets.filter(m => m.marketId !== payload.marketId), payload],
        loading: false,
        error: null
      };
    case actions.OUTCOME:
      return {
        ...state,
        outcomes: [...state.outcomes.filter(o => o.outcomeId !== payload.outcomeId), payload],
        loading: false,
        error: null
      };
    case actions.PAGE_RESET: {
      return {
        ...state,
        options: { ...state.options, marketsPage: 1 },
        loading: false,
        error: null
      };
    }
    case actions.PAGE_DECREMENT:
      return {
        ...state,
        options: {
          ...state.options,
          marketsPage: state.options.marketsPage > 1 ? state.options.marketsPage - 1 : state.options.marketsPage
        },
        loading: false,
        error: null
      };
    case actions.PAGE_INCREMENT:
      return {
        ...state,
        options: {
          ...state.options,
          marketsPage: state.options.marketsPage + 1
        },
        loading: false,
        error: null
      };
    case actions.TRIGGER_FORMAT:
      return {
        ...state,
        options: { ...state.options, format: payload },
        error: null
      };
    case actions.TRIGGER_PRIMARY_MARKET:
      return {
        ...state,
        options: { ...state.options, primaryMarket: payload },
        error: null
      };
    case actions.MARKETS_VIEW_TYPE:
      return {
        ...state,
        options: { ...state.options, marketsViewType: payload },
        loading: false,
        error: null
      };
    case actions.ERROR:
    case actions.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}

export const StoreContext = React.createContext();
export const DispatchContext = React.createContext();
