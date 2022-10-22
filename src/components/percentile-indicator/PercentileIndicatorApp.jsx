/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import {PercentileIndicator} from './PercentileIndicator';


export const PercentileIndicatorApp = (props) => {
  const values = [];
  for (var dog = 101; dog--; dog >= 0) {
    values.push(dog);
  }
  ;

  const valuesFine = [];
  for (var dog = 1001; dog -= 1; dog >= 950) {
    valuesFine.push(dog);
  }
  return (
    <>
      {values.map(dude => <PercentileIndicator value={dude / 100} showValue={true}/>)}

      {valuesFine.map(dude => <PercentileIndicator value={dude / 1000} showValue={true}/>)}

    </>
  );
}
//const div = document.createElement('div');
//ReactDOM.render(<PercentileIndicatorApp />, div);
//ReactDOM.unmountComponentAtNode(div);


