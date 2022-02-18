import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import Regions from '../../lib/data/regions';
import { AddressType } from '../../modules/types/notice';
import findFirstRegion from '../functions/findFirstRegion';

type Props = {
  submit: Function;
  className?: string;
  initRegion?: AddressType;
};

const SelcetRegion: React.FC<Props> = ({ submit, className, initRegion }) => {
  const [region1, setRegion1] = useState(
    findFirstRegion(initRegion?.dou) || ''
  );
  const [region2, setRegion2] = useState(initRegion?.dou || '');
  const [region3, setRegion3] = useState(initRegion?.si || '');
  const [region4, setRegion4] = useState(initRegion?.gu || '');

  const splitRegion3 = (region: string) => {
    const regionSplited = region.split(' ');
    setRegion4('');
    setRegion3(regionSplited[0]);
    if (regionSplited.length > 1) {
      setRegion4(regionSplited[1]);
    }
  };
  useEffect(() => {
    submit({
      gwon: region1,
      dou: region2,
      si: region3,
      gu: region4,
    });
  }, [region1, region2, region3, region4]);

  return (
    <div className="flex flex-col sm:flex-row justify-center pb-2 space-x-2">
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => {
            setRegion4('');
            setRegion3('');
            setRegion2('');
            setRegion1(e.target.value);
          }}
          value={region1}
        >
          <option value="">지역을 선택해주세요</option>
          {Object.keys(Regions).map((region) => {
            return (
              <React.Fragment key={v4()}>
                <option value={region}>{region}</option>
              </React.Fragment>
            );
          })}
        </select>
      </div>
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => {
            setRegion4('');
            setRegion3('');
            setRegion2(e.target.value);
          }}
          value={region2}
        >
          <option value="">
            {region1 ? '지역을 선택해주세요' : '- - - - - - - - - - - - -'}
          </option>
          {region1 &&
            Object.keys(Regions[region1]).map((region) => {
              return (
                <React.Fragment key={v4()}>
                  <option value={region}>{region}</option>
                </React.Fragment>
              );
            })}
        </select>
      </div>
      <div className={`border-2 rounded ${className}`}>
        <select
          className="border-gray-400 hover:border-gray-400 outline-none"
          onChange={(e) => splitRegion3(e.target.value)}
          value={region4 ? region3.concat(' ', region4) : region3}
        >
          <option value="">
            {region2 ? '지역을 선택해주세요' : '- - - - - - - - - - - - -'}
          </option>
          {region2 &&
            Object.keys(Regions[region1][region2]).map((index) => {
              return (
                <React.Fragment key={v4()}>
                  <option value={Regions[region1][region2][Number(index)]}>
                    {Regions[region1][region2][Number(index)]}
                  </option>
                </React.Fragment>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default React.memo(SelcetRegion);
