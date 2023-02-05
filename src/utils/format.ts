/**
 * @description convert UNIX timestamp, representing date in seconds to defaul date
 * @param value timestamp in seconds (UNIX timestamp)
 * @returns {Date}
 */
export const getDateUnix = (value: number) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  return new Date(value * 1000);
};
