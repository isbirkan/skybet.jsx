import React, { Fragment, useContext } from 'react';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import * as actions from '../../constants/actions';
import * as resources from '../../constants/resources/event';

import MarketsView from '../Toggler/MarketsView';
import Market from '../Market';
import Loader from '../Loader/SmallLoader';
import Error from '../../pages/Error';

export default function InfiniteEvent(props) {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const { marketList } = props;
  const page = store.options.marketsPage;
  const resultsPerPage = store.options.marketsResultsPerPage;
  const incrementAvailable = page < Math.ceil(marketList.length / resultsPerPage);

  function handleChangePage(increment) {
    if (increment && incrementAvailable) {
      dispatch([actions.PAGE_INCREMENT]);
    } else {
      dispatch([actions.PAGE_DECREMENT]);
    }
  }

  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && marketList) {
    const nav = (
      <nav aria-label="Event markets pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              disabled={page === 1}
              tabIndex="-1"
              onClick={() => handleChangePage()}>
              {resources.PREVIOUS}
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link unlink" tabIndex="-1">
              {page}
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              disabled={!incrementAvailable}
              tabIndex="-1"
              onClick={() => handleChangePage(true)}>
              {resources.NEXT}
            </button>
          </li>
        </ul>
      </nav>
    );

    content = (
      <Fragment>
        <div className="card-body">
          <div className="card-title">
            <h5>{resources.MARKETS_HEADER}</h5>
            <span className="event-top-nav">
              <MarketsView /> {nav}
            </span>
          </div>
          <ul className="list-group list-group-flush">
            {marketList.slice((page - 1) * resultsPerPage, page * resultsPerPage).map(market => (
              <li key={`market_${market}`} className="list-group-item">
                <Market id={market} />
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">{nav}</div>
      </Fragment>
    );
  }
  return content;
}
