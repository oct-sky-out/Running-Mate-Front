const dateParser = (date: Date) => {
  const yearMonthDay = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const time = ` ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }`;
  return yearMonthDay + time;
};

export default dateParser;
