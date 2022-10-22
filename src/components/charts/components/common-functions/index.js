/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



export const prepareDataForDisplay = (dataElement, hiddenEntriesElement) => {
  const visibleData = hiddenEntriesElement
    ? dataElement.filter(entry => !hiddenEntriesElement.includes(entry.name))
    : dataElement;

  const isChartEmpty = visibleData.map(data => data.value).every(item => item === 0);

  return { visibleData, isChartEmpty };
};
