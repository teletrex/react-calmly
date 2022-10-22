/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import Widget from "../widget/Widget";
import imageFile from '../../assets/icons/ex3.jpg';


const JourneyMapPathToPurchaseWidget = props => {
  return (
    <Widget {...props}>
      <div><img src={imageFile} /></div>
    </Widget>

  )
}

export default JourneyMapPathToPurchaseWidget;
