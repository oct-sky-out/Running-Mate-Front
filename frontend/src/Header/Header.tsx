import React from 'react';
import { ReactComponent as Logo } from '../logo.svg';

export default function Header() {
  return (
    <>
      <div className="sticky top-0 flex">
        <div>
          <Logo />
        </div>
        <div className="m-5 bg-yellow-500 text-blue-500 font-bold">asc</div>
        <div>ww</div>
      </div>
    </>
  );
}
