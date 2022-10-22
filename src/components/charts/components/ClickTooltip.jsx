/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


import React from 'react';
import {Close} from "@carbon/icons-react";
import settings from "../../../settings";

const {prefix} = settings;

const ClickTooltip = (
  {
    children,
    onCloseRequest
  }
) => {

  return (
    <div className={`recharts-default-tooltip ${prefix}--click-tooltip`}>
      <div style={{"position": "relative"}}>
        <div className={"click-tooltip-content"}>{children}</div>
        <div
          className={"click-tooltip-close-box"}
          onClick={onCloseRequest}
        ><Close size={20} /></div>


      </div>
    </div>
  );
};

export default ClickTooltip;
