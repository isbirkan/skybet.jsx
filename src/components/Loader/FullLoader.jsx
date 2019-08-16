import React from 'react';

import './Loader.scss';

export default function Loader() {
  return (
    <div className="loading-full">
      <img alt="" src={`${process.env.PUBLIC_URL}/assets/loader-1.svg`} />
    </div>
  );
}
