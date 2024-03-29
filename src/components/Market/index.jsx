import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/useSocket';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import service from '../../services/api';
import * as requestType from '../../constants/requestTypes';

import Outcome from '../Outcome';
import Loader from '../Loader/SmallLoader';
import Error from '../../pages/Error';

import './Market.scss';

export default function Market(props) {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const sendMessage = useContext(SocketContext);
  const { getMarket } = service(dispatch);
  const marketId = props.id;
  const showOutcomes = props.showOutcomes;

  function getCurrentMarket() {
    return store.markets.find(m => m.marketId === +marketId);
  }

  function chunkArray(myArray, chunkSize) {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  useEffect(() => {
    if (!store.loading && !store.markets.find(m => m.marketId === +marketId)) {
      if (props.callType === 'socket') {
        sendMessage({ type: requestType.MARKET, id: +marketId });
      } else {
        getMarket(+marketId);
      }

      getMarket(+marketId);
    }
  }, [marketId, props.callType, store.loading]);

  const market = getCurrentMarket();
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && market) {
    const outcomeChunks = chunkArray(market.outcomes, 3);
    content = (
      <table className="table table-responsive-sm primary-market">
        <thead>
          <tr>
            <th colSpan="3" className="text-center">
              {market.name}
            </th>
          </tr>
        </thead>
        {showOutcomes && (
          <tbody>
            {outcomeChunks.map((outcomes, orIndex) => (
              <tr key={`outcomeRow_${orIndex}`}>
                {outcomes.map((outcome, ocIndex) => (
                  <td key={`outcomeColumn_${ocIndex}`}>
                    <Outcome id={outcome} callType={props.callType} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    );
  }
  return content;
}
