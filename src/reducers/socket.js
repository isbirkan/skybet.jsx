import React from 'react';
import * as actions from '../constants/actions';

export const initialState = {
  events: [],
  markets: [],
  outcomes: [],
  liveEvents: [],
  format: 'fractional',
  loading: true,
  error: null
};

export function socketReducer(state, [type, payload]) {
  switch (type) {
    case actions.LIVE_EVENTS:
      return {
        ...state,
        liveEvents: payload,
        loading: false
      };
    case actions.INIT:
      return {
        ...state,
        loading: false
      };
    case actions.TRIGGER_FORMAT:
      return {
        ...state,
        format: payload
      };
    default:
      return state;
  }
}

export const StoreContext = React.createContext();
export const DispatchContext = React.createContext();
