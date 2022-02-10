import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import imageURL from '../../lib/URL/Image';

const CrewImageSlider = () => {
  const [imageOrder, setImageOrder] = useState(0);

  //* useEffect
  useEffect(() => {
    const changeImage = setInterval(() => {
      setImageOrder(imageOrder === 2 ? 0 : imageOrder + 1);
    }, 5000);

    return () => clearInterval(changeImage);
  }, [imageOrder]);

  return (
    <div className="h-full flex justify-center align-center">
      {imageURL.map((url, index) => {
        return (
          imageOrder === index && (
            <div key={v4()} className="w-full h-full bg-white opacity-70">
              <div
                className="w-full h-full transition-opacity bg-contain sm:bg-cover sm:bg-fixed bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${url})` }}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

export default React.memo(CrewImageSlider);
