import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/outcome';

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
    if (!store.loading && !getCurrentOutcome()) {
      sendMessage({ type: requestType.OUTCOME, id: +outcomeId });
    }
  }, [outcomeId, store.format, store.loading, sendMessage]);

  const outcome = getCurrentOutcome();

  function buildPrice() {
    const { format } = store;

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
    content = (
      <table className="table table-responsive-sm market">
        <tbody>
          <tr>
            <th>{resources.NAME}</th>
            <td>{outcome.name}</td>
          </tr>
          <tr>
            <th>{resources.PRICE}</th>
            <td>{buildPrice()}</td>
          </tr>
          <tr>
            <th>{resources.RESULT}</th>
            <td>{outcome.result.result}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return <div className="d-flex justify-content-center align-items-center">{content}</div>;
}
