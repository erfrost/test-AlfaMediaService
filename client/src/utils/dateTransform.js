export const dateTransform = (date) => {
  const splitDate = date.split("T");
  const currentDate = splitDate[0];
  const resultDate = currentDate.split("-").reverse().join(".");

  const currentTime = splitDate[1].split(":");
  const hours = currentTime[0];
  const minutes = currentTime[1];
  const seconds = currentTime[2].split(".")[0];
  const resultTime = `${hours}:${minutes}:${seconds}`;

  const result = `${resultDate} ${resultTime}`;
  return result;
};
