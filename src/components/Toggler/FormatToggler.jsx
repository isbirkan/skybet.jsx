import React, { useContext, useEffect } from 'react';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import * as actions from '../../constants/actions';
import * as resources from '../../constants/resources/toggler';

import './Toggler.scss';

export default function FormatToggler() {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  function toggleFormat() {
    dispatch([actions.TRIGGER_FORMAT, store.options.format === 'decimal' ? 'fractional' : 'decimal']);
  }

  useEffect(() => {}, [store.format]);

  return (
    <div className="toggler-round btn btn-sm ml-1 mr-1">
      {resources.DECIMAL}
      <label className="switch ml-2 mr-2">
        <input type="checkbox" checked={store.options.format === 'fractional'} onChange={() => toggleFormat()} />
        <span className="slider round" />
      </label>
      {resources.FRACTIONAL}
    </div>
  );
}
