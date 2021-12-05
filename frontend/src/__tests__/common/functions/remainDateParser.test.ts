const remainDateParser = (dateMilli: number) => {
  const future = new Date(dateMilli);
  const futureMilliseconds = future.setMilliseconds(1000);
  const remainMilli = futureMilliseconds - Date.now();

  if (remainMilli >= 24 * 3600000)
    return Math.floor(remainMilli / (24 * 3600000)) + '일';
  if (remainMilli < 24 * 3600000)
    return (
      Math.floor(remainMilli / 3600000) +
      '시간 ' +
      Math.floor((remainMilli % 3600000) / 60000) +
      '분'
    );
};

describe('', () => {
  test('12월 25일이 들어오면 19일이 결과로 나와야한다 (2021.12.6일 기준)', () => {
    const future = new Date('December 25, 2021 13:00:00');
    const futureMilliseconds = future.setMilliseconds(1000);

    expect(remainDateParser(futureMilliseconds)).toEqual('19일');
  });
  test('12월 06일 13시 2분이 들어오면 1시간 2분이 결과로 나와야한다 (2021.12.6일 기준)', () => {
    const future = new Date('December 6, 2021 02:00:00');
    const futureMilliseconds = future.setMilliseconds(1000);

    expect(remainDateParser(futureMilliseconds)).toEqual('1시간 2분');
  });
});
