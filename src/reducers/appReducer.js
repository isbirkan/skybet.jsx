import React from 'react';
import * as actions from '../constants/actions';

export const initialState = {
  events: [],
  markets: [],
  outcomes: [],
  options: {
    primaryMarket: true,
    format: 'decimal'
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
    case actions.LIVE_EVENTS:
      return {
        ...state,
        events: [...state.events.filter(e => payload.filter(pe => e.eventId !== pe.eventId)), ...payload],
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
    case actions.LOADING:
      return {
        ...state,
        loading: true,
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
