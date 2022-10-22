/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



export const getDisplayName = Component =>
  Component.displayName ||
  Component.name ||
  (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
