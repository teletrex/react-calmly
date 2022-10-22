/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useRef, useEffect, useState, useCallback} from "react";

import HoverPopup from "../../hover-popup";
import settings from "../../../settings";

/* add in tracking the width for changes and calculating showTooltip */
const {prefix} = settings;

export const FlexibleColumnHeader = (
  {
    header
  }) => {

  const shouldIShowTooltip =  ({rootNode,targetNode}) => {
    const titleNode = targetNode.children[0];
    const subTitleNode = targetNode.children.length > 1 ? targetNode.children[1] : false;
    if (titleNode.offsetHeight + 1 < titleNode.scrollHeight   ||
      (titleNode.offsetWidth < titleNode.scrollWidth) ||
      (subTitleNode && subTitleNode.offsetWidth < subTitleNode.scrollWidth))
      return true;
    else return false;
  };

  // browser defect workaround if no header title is supplied and a blank header is desired.

  if ( ((header.subTitle && header.subTitle.trim().length === 0) || !header.subTitle)
       &&
    (( header.title && header.title.trim().length === 0) || !header.title)) {
    return (
    <HoverPopup
      onShow={shouldIShowTooltip}
      narrow
      align={"center"}
      direction={"bottom"}
      tooltip={header.title.trim()}>
      <div
        className={`${prefix}--flexible-column-header--title-only`}
      >
        <span style={{"color":"transparent"}}>.</span>
      </div>
    </HoverPopup>
    )
  }

  if (header.titleSymbol) {
    return (
      <div className={`${prefix}--flexible-column-header--title-with-symbol`}>
        <HoverPopup
          onShow={shouldIShowTooltip}
          narrow
          align={"center"}
          direction={"bottom"}
          tooltip={header.title.trim()}>

          <div
            className={`${prefix}--flexible-column-header--title`}
          >
            {header.title.trim()}
          </div>
        </HoverPopup>
        <HoverPopup
          onShow={true}
          narrow
          align={"center"}
          direction={"bottom"}
          tooltip={header.titleSymbolTooltip && header.titleSymbolTooltip.trim()}>
          <div className={`${prefix}--flexible-column-header--symbol`}>
            {header.titleSymbol}
          </div>
        </HoverPopup>
      </div>
    )
  } else if (header.subTitle && header.subTitle.trim().length > 0) {
    return (
      <HoverPopup
        onShow={shouldIShowTooltip}
        align={"center"}
        narrow
        direction={"bottom"}
        tooltip={header.title.trim() + " " + header.subTitle.trim()}>
        <div className={`${prefix}--flexible-column-header--title-row`}>{header.title.trim()}</div>
        <div className={`${prefix}--flexible-column-header--subtitle-row`}>{header.subTitle.trim()}</div>
      </HoverPopup>
    )
  }
  else {
    return (
      <div className={`${prefix}--flexible-column-header--title-only`}>
        <HoverPopup
          onShow={shouldIShowTooltip}
          narrow
          align={"center"}
          direction={"bottom"}
          tooltip={header.title.trim()}>
          <div
            className={`${prefix}--flexible-column-header--title`}
          >
            {header.title.trim()}
          </div>
        </HoverPopup>
      </div>
    )
  }
}

