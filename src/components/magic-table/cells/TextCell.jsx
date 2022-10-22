/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import ElevenTooltip from "../../eleven-tooltip";


const notEqualShouldRender = ( prevState, nextState)  => {
  return (prevState.value !== nextState.value );
}

const TextCell = ({
  value,
}) => {

  return (
    value != null &&
    <ElevenTooltip text={value} class={"textcell"}>{value}</ElevenTooltip>
  );
}


export default React.memo(TextCell);

