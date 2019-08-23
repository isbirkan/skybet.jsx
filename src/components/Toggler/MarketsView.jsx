import React, { useContext, useEffect } from 'react';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import * as actions from '../../constants/actions';
import * as resources from '../../constants/resources/toggler';

import './Toggler.scss';

export default function MarketsViewToggler() {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  function toggleMarketsView() {
    dispatch([actions.MARKETS_VIEW_TYPE, store.options.marketsViewType === 'infinite' ? 'pagination' : 'infinite']);
  }

  useEffect(() => {}, [store.options.marketsViewType]);

  return (
    <div className="toggler-round btn btn-sm ml-1 mr-1">
      {resources.PAGINATION}
      <label className="switch ml-2 mr-2">
        <input
          type="checkbox"
          checked={store.options.marketsViewType === 'infinite'}
          onChange={() => toggleMarketsView()}
        />
        <span className="slider round" />
      </label>
      {resources.INFINITE}
    </div>
  );
}
