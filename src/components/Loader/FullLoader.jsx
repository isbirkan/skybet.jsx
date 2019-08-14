import React from 'react';

import './Loader.css';

export default function FullLoader() {
  return (
    <div className="loading-full">
      <img alt="" src={`${process.env.PUBLIC_URL}/assets/loader-1.svg`} />
    </div>
  );
}
