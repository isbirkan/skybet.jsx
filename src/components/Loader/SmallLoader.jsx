import React from 'react';

export default function Loader() {
  return (
    <div className="progress mt-3">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: '75%' }}
      />
    </div>
  );
}
