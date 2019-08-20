import React from 'react';
import { Link } from 'react-router-dom';
import { NOT_FOUND, NOT_FOUND_INFO_1, NOT_FOUND_INFO_2 } from '../constants/resources/shared';

export default function NotFound() {
  return (
    <div className="full-height d-flex justify-content-center align-items-center">
      <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
      <div className="inline-block ">
        <h1 className="lead">{NOT_FOUND}</h1>
        <h1 className="lead">
          {NOT_FOUND_INFO_1} <Link to="/">home</Link> {NOT_FOUND_INFO_2}
        </h1>
      </div>
    </div>
  );
}
