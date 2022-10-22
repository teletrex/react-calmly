/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { Suspense } from 'react';
import BiLevelPercentileIndicator from './components/BiLevelPercentileIndicator';

const values =[];
for (var dog = 100; dog--; dog >=0) {
  values.push(dog);
}

const valuesFine =[];
for (var dog = 1000; dog-=1; dog >=950) {
  valuesFine.push(dog);
}


const App2 = () => (
  <>
    {    values.map(dude => <BiLevelPercentileIndicator value={dude/100} showValue={true}/>)}
      
    {    valuesFine.map(dude => <BiLevelPercentileIndicator value={dude/1000} showValue={true}/>)}

  </>
);

const div = document.createElement('div');
ReactDOM.render(<App2 />, div);
ReactDOM.unmountComponentAtNode(div);


