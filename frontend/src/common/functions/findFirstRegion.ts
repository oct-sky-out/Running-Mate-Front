import regions from '../../lib/data/regions';

const findFirstRegion = (region2?: string) => {
  let region1 = '';
  if (region2)
    Object.keys(regions).forEach((key) => {
      if (Object.keys(regions[key]).includes(region2)) {
        region1 = key;
      }
    });
  return region1;
};

export default findFirstRegion;
