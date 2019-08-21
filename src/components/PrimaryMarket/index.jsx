import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';
import * as requestType from '../../constants/requestTypes';

import Outcome from '../Outcome';
import Loader from '../Loader/SmallLoader';
import Error from '../../pages/Error';

import './PrimaryMarket.scss';

export default function PrimaryMarket(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);
  const marketId = props.id;

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
      sendMessage({ type: requestType.MARKET, id: +marketId });
    }
  }, [marketId, store.loading, sendMessage]);

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
        <tbody>
          {outcomeChunks.map((outcomes, index) => (
            <tr key={`outcomeRow_${index}`}>
              {outcomes.map((outcome, index) => (
                <td key={`outcomeColumn_${index}`}>
                  <Outcome id={outcome} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <tr>
      <td colSpan="3" className="row-primary-market">
        {content}
      </td>
    </tr>
  );
}
