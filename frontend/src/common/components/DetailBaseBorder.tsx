import React from 'react';

const DetailBaseBorder: React.FC = ({ children }) => {
  return (
    <div className="w-4/5 mx-auto my-20 p-10 border rounded-3xl shadow-lg relative max-w-screen-xl">
      {children}
    </div>
  );
};

export default DetailBaseBorder;
