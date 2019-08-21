import React, { useContext, useEffect, useState } from 'react';
import { Animate } from 'react-show';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';

export default function PrimaryMarket() {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);

  return (
    <Animate
      show={store.options.primaryMarket}
      transitionOnMount
      duration={500}
      start={{
        opacity: 0,
        height: 0
      }}
      enter={{
        opacity: 1,
        height: 'auto'
      }}
      leave={{
        opacity: 0,
        height: 0
      }}>
      <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
      </tr>
    </Animate>
  );
}
