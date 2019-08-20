import React, { useContext, useEffect } from 'react';
import { DispatchContext, StoreContext } from '../../reducers/socket';
import * as actions from '../../constants/actions';
import * as resources from '../../constants/resources/toggler';

import './PrimaryMarketToggler.scss';

export default function PrimaryMarketToggler() {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  function togglePrimaryMarket() {
    dispatch([actions.TRIGGER_PRIMARY_MARKET, !store.primaryMarket]);
  }

  useEffect(() => {}, [store.primaryMarket]);

  return (
    <div className="toggler btn btn-sm ml-1 mr-1">
      {resources.PRIMARY_MARKET}
      <label className="switch ml-2">
        <input type="checkbox" checked={store.primaryMarket} onChange={() => togglePrimaryMarket()} />
        <span className="slider" />
      </label>
    </div>
  );
}
