const remainDateParser = (dateMilli: number) => {
  const future = new Date(dateMilli);
  const futureMilliseconds = future.setMilliseconds(1000);
  const remainMilli = futureMilliseconds - Date.now();

  if (remainMilli < 0) return '기간만료';
  if (remainMilli >= 24 * 3600000)
    return `${Math.floor(remainMilli / (24 * 3600000))}일`;
  if (remainMilli < 24 * 3600000)
    return `${Math.floor(remainMilli / 3600000)}
      시간
      ${Math.floor((remainMilli % 3600000) / 60000)}
      분`;
  return '제한시간 없음';
};

export default remainDateParser;
