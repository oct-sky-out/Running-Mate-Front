import React from 'react';

const DetailBaseBorder: React.FC = ({ children }) => {
  return (
    <div className="w-full md:w-4/5 mx-auto my-5 md:my-20 p-2 md:p-10 md:border md:rounded-3xl md:shadow-lg relative max-w-screen-xl">
      {children}
    </div>
  );
};

export default DetailBaseBorder;
