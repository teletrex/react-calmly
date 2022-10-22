/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import {Tag} from "@carbon/react";
import PropTypes, {arrayOf} from 'prop-types';

const notEqualShouldRender = ( prevState, nextState)  => {
  return (prevState.value !== nextState.value );
}

const TagCell = ({
  color,
  text,
  onClick
}) => {

  return (
    (color != null && text != null) ?
      <div className={"no-ellipsis-wrapper"}>
        <Tag
          shapeForm="oval"
          onClick={onClick}
          type={color === null ? "gray" : color}
        >
          {text === null ? "":text}
        </Tag>
      </div>
      : ""
  );
};

export default React.memo(TagCell);

TagCell.propTypes = {
  value : PropTypes.string,
  onClick:PropTypes.func
}

