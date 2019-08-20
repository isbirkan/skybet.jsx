import React from 'react';
import { ERROR } from '../constants/resources/shared';

export default function Error(props) {
  return <p>{`${ERROR} ${props.message}`}</p>;
}
