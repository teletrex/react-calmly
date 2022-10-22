/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import FileSaver from 'file-saver';  


export const exportFile = (content, filename="export.csv") => {
  if(content == null || content == undefined) return;
  let type = "data:application/json;charset=utf-8";
  let blob =new Blob([content], {type: type});

  let isFileSaverSupported = false;
  try {
    isFileSaverSupported = !!new Blob();
  } catch (e) {
    console.log(e);
  }

  if (isFileSaverSupported) {
    FileSaver.saveAs(blob, filename);
  }else{
    FileSaver.open(encodeURI(type + "," + content));
  }
} 


export const exportJsonFile = (data, filename="export.csv") => {
  if(data == null || data == undefined) return;

  let content = JSON.stringify(data, null, 2);
  let type = "data:application/json;charset=utf-8";
  let blob =new Blob([content], {type: type});

  let isFileSaverSupported = false;
  try {
    isFileSaverSupported = !!new Blob();
  } catch (e) {
    console.log(e);
  }

  if (isFileSaverSupported) {
    FileSaver.saveAs(blob, filename);
  }else{
    FileSaver.open(encodeURI(type + "," + content));
  }
} 
