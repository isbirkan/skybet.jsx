import React, { Fragment, useContext, useEffect } from 'react';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import service from '../../services/api';
import * as resources from '../../constants/resources/event';

import Market from '../Market';
import MarketsView from '../Toggler/MarketsView';
import Loader from '../Loader/SmallLoader';
import Error from '../../pages/Error';

export default function InfiniteEvent(props) {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const { getMarkets } = service(dispatch);
  const { marketList, eventId } = props;

  useEffect(() => {
    if (marketList) {
      const marketsToRetrieve = marketList.filter(m => !store.markets.map(sm => sm.marketId).includes(m));
      getMarkets(marketsToRetrieve);
    }
  }, [marketList, store.loading]);

  const markets = store.markets
    .filter(m => m.eventId === eventId)
    .sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && markets) {
    content = (
      <Fragment>
        <div className="card-body">
          <div className="card-title">
            <h5>{resources.MARKETS_HEADER}</h5>
            <span className="event-top-nav">
              <MarketsView />
            </span>
          </div>
          {markets.map(market => (
            <Market key={`market_${market.marketId}`} id={market.marketId} />
          ))}
        </div>
      </Fragment>
    );
  }
  return content;
}
