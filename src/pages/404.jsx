import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="full-height d-flex justify-content-center align-items-center">
      <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
      <div className="inline-block ">
        <h1 className="lead">The page you requested was not found.</h1>
        <h1 className="lead">
          Go back to <Link to="/">home</Link>
        </h1>
      </div>
    </div>
  );
}
