import React from 'react';

import './Loader.scss';

export default function Loader() {
  return (
    <div className="loading-mini">
      <img alt="" src={`${process.env.PUBLIC_URL}/assets/loader-2.svg`} />
    </div>
  );
}
