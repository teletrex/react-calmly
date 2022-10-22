/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




const getDate = timestamp => (timestamp ? new Date(timestamp) : new Date());

export const getDayTimestamp = datestring => {
  const day = getDate(datestring);
  return day.setHours(0, 0, 0, 0);
};

export const getTodayTimestamp = () => getDayTimestamp();

export const getReadOnlyDate = timestamp => {
  const date = getDate(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// used for the datetime attribute in <time> tags
export const getMachineDateTime = timestamp => {
  const date = getDate(timestamp);
  return date.toISOString();
};
