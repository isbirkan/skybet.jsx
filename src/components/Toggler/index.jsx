import React from 'react';

import './Toggler.scss';

export default function Toggler(props) {
  return (
    <label className="switch">
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <span className="slider" />
    </label>
  );
}
