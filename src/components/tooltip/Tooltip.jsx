/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useRef, useEffect, useState, useCallback} from "react";

import settings from "../../settings";

/* add in tracking the width for changes and calculating showTooltip */

const {prefix} = settings;

export const Tooltip = (
  {
    text,
    children,
    align
  }) => {

  const shouldIShowTooltip =  ({rootNode,targetNode}) => {
    const textNode = targetNode.children[0];
    if (textNode.offsetWidth < textNode.scrollWidth)
      return true;
    else return false;
  };
    return (
      <div>
        {children}
      </div>
    )

    // TODO:   fix the tooltip later. It needs a button which is ridiculous
/*
    return (
      <div className={`${prefix}--eleven-tooltip`}>
        <Tooltip
          onShow={shouldIShowTooltip}
          align={align}
          label={text}
        ><div>
          {children}
        </div>
        </Tooltip>
      </div>
    )
*/

}

