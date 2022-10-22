/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import HoverPopup from "../../hover-popup";
import OpportunityRankTooltip from "./OpportunityRankTooltip";


const notEqualShouldRender = ( prevState, nextState)  => {
  return (prevState.value !== nextState.value || prevState.children !== nextState.children);
}

const OpportunityCell = ({
  value,
  children

}) => {

  return (
    <HoverPopup direction={"bottom"} align={"start"} narrow tooltip={<OpportunityRankTooltip value={value}/>}>{children}</HoverPopup>
  );
};

export default React.memo(OpportunityCell);

