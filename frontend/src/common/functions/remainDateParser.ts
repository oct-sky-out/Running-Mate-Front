const remainDateParser = (dateMilli: number) => {
  const future = new Date(dateMilli);
  const futureMilliseconds = future.setMilliseconds(1000);
  const remainMilli = futureMilliseconds - Date.now();

  const ONE_DAY_HOURS = 24;
  const ONE_HOUR_TO_MILLISECOND = 3600000;
  const ONE_MINUTE_TO_MILLISECOND = 60000;

  if (remainMilli < 0) return '기간만료';
  if (remainMilli >= ONE_DAY_HOURS * ONE_HOUR_TO_MILLISECOND)
    return `${Math.floor(
      remainMilli / (ONE_DAY_HOURS * ONE_HOUR_TO_MILLISECOND)
    )}일`;
  if (remainMilli < ONE_DAY_HOURS * ONE_HOUR_TO_MILLISECOND)
    return `${Math.floor(remainMilli / ONE_HOUR_TO_MILLISECOND)}
      시간
      ${Math.floor(
        (remainMilli % ONE_HOUR_TO_MILLISECOND) / ONE_MINUTE_TO_MILLISECOND
      )}
      분`;
  return '제한시간 없음';
};

export default remainDateParser;
