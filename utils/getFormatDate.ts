export const getFormatDate = (date: Date) => {
  const tmpDate = new Date(date);
  return `${new Date(tmpDate).getFullYear()}-${
    tmpDate.getMonth() + 1
  }-${tmpDate.getDate()} ${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
};
