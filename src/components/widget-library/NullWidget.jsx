/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import Widget from "../widget/Widget";

const NullWidget = props => {
  return (
    <Widget {...props}>
      <div>Widget Currently Not Available</div>
    </Widget>

  )
}

export default NullWidget;
