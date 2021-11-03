import React from 'react';
// import Logo from '../logo.svg';

export default function Header() {
  return (
    <>
      <div className="sticky top-0 flex">
        <div>
          <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" />
        </div>
        <div>ww</div>
      </div>
    </>
  );
}
