import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';
import * as requestType from '../../constants/requestTypes';

import Loader from '../Loader/SmallLoader';
import Error from '../../pages/Error';

export default function Outcome(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);
  const outcomeId = props.id;

  function getCurrentOutcome() {
    return store.outcomes.find(m => m.outcomeId === +outcomeId);
  }

  useEffect(() => {
    if (!store.loading && !store.outcomes.find(m => m.outcomeId === +outcomeId)) {
      sendMessage({ type: requestType.OUTCOME, id: +outcomeId });
    }
  }, [outcomeId, store.options.format, store.loading, sendMessage]);

  const outcome = getCurrentOutcome();

  function formatOutcome() {
    const { format } = store.options;

    if (format === 'decimal') {
      return outcome.price.decimal;
    }
    return `${outcome.price.num}/${outcome.price.den}`;
  }

  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && outcome) {
    content = `${outcome.name} ${formatOutcome()}`;
  }

  return <div className="d-flex justify-content-center align-items-center">{content}</div>;
}
