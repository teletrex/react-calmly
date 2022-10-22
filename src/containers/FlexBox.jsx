/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


import React , {useState, useEffect} from "react";
import PropTypes from 'prop-types'

const FlexBox = (
  {
    children,
    flexDirection,
    rowGap,
    columnGap,
    justifyContent,
    alignItems,
    padding,
    onClick,
  }) => {

  const [computedStyle,setComputedStyle] = useState({});

  useEffect (() => {
    setComputedStyle(
      {
        display:"flex",
        ...computedStyle,
        flexDirection,
        rowGap,
        padding,
        columnGap,
        justifyContent,
        alignItems
      }
    )
  },[flexDirection,rowGap,padding,columnGap,justifyContent,alignItems]
  );

  return (
    <div
      style={computedStyle}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

FlexBox.propTypes = {
  alignItems: PropTypes.oneOf(
    [
      "flex-start",
      "flex-end",
      "center",
      "start",
      "end",
      "self-start",
      "self-end",
      "stretch",
    ]
  ),
  flexDirection: PropTypes.oneOf(
    [
      "row",
      "column",
      "column-reverse",
      "row-reverse"
    ]
  ),
  justifyContent: PropTypes.oneOf(
    [
      "flex-start",
      "flex-end",
      "center",
      "space-around",
      "space-between",
      "space-evenly"])
}

FlexBox.defaultProps = {
  flexDirection:"row",
  flexGap:"10px",
  padding:"0",
  columnGap:"10px",
  justifyContent:"space-between",
  alignItems:"center"
}
export default FlexBox;





