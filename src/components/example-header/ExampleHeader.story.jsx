/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';


import ExampleHeader from "./ExampleHeader";
import {useTranslation} from "../../translation";


export default {
  title: 'Components/ExampleHeader',
  component: ExampleHeader
}



export const Default = () => {

  const {t} = useTranslation();

  return (

  <div className="rc-ui-shell">
    <div className="navigation rc-ui-shell__navigation">
      <ExampleHeader t={t}/>
    </div>
  </div>
  )
}
