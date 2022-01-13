import React, { useState, useEffect } from 'react';
import Regions from '../../lib/data/regions';

type Props = {
  submit: Function;
  className?: string;
};

const SelcetRegion: React.FC<Props> = ({ submit, className }) => {
  const [region1, setRegion1] = useState('');
  const [region2, setRegion2] = useState('');
  const [region3, setRegion3] = useState('');

  useEffect(() => {
    console.log({
      si: region1,
      gu: region2,
      dong: region3,
    });
    submit({
      si: region1,
      gu: region2,
      dong: region3,
    });
  }, [region2, region3]);
  return (
    <div className="flex flex-col sm:flex-row justify-center w-full pb-2">
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => {
            setRegion3('');
            setRegion2('');
            setRegion1(e.target.value);
          }}
        >
          <option value="선택">지역을 선택해주세요</option>
          {Object.keys(Regions).map((region) => {
            return <option value={region}>{region}</option>;
          })}
        </select>
      </div>
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => {
            setRegion3('');
            setRegion2(e.target.value);
          }}
        >
          <option value="">
            {region1 ? '지역을 선택해주세요' : '- - - - - - - - - -'}
          </option>
          {region1 &&
            Object.keys(Regions[region1]).map((region) => {
              return <option value={region}>{region}</option>;
            })}
        </select>
      </div>
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => setRegion3(e.target.value)}
        >
          <option value="선택">
            {region2 ? '지역을 선택해주세요' : '- - - - - - - - - -'}
          </option>
          {region2 &&
            Object.keys(Regions[region1][region2]).map((index) => {
              return (
                <option value={Regions[region1][region2][Number(index)]}>
                  {Regions[region1][region2][Number(index)]}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SelcetRegion;
