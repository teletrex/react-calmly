/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import {CaretLeft, CaretRight} from "@carbon/icons-react";


export const PagerControl = (
  {
    totalPages,
    currentPage,
    onPreviousPage,
    onNextPage,
    ofLabel,
    ...props
  }
) => {

  // prevents selection of elements
  const limitEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
      <div className={"eleven-pager-control"} onMouseDown={limitEvent}>
        <div onClick={onPreviousPage}><CaretLeft size={32}/></div>
        <div>{currentPage}</div>
        <div> {ofLabel} </div>
        <div>{totalPages}</div>
        <div onClick={onNextPage}><CaretRight size={32}/></div>
      </div>
    )

};

PagerControl.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
  ofLabel: PropTypes.string
};

PagerControl.defaultProps = {
  totalPages: 0,
  currentPage: 0,
  ofLabel: "of"
}
