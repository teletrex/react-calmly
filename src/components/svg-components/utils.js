/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




export const getSVGSizeProps = (size, height, width) => {
  const props = size ? { width: size, height: size } : {};
  if (height) {
    props.height = height;
  }
  if (width) {
    props.width = width;
  }
  return props;
};
