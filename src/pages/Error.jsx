import React from 'react';

export default function Error(props) {
  return <p>{`An error has occurred: ${props.message}`}</p>;
}
