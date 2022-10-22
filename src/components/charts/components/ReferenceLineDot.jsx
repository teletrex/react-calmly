/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dot as RechartsDot,Layer,Rectangle } from 'recharts';

import { buildClass } from './className';

const isAlert = ({ yLineIsAlert }) => {
  return Boolean(yLineIsAlert);
};

const ReferenceLineDot = ({  ...props }) => {

//  console.log(" = = = = = = = = ")
//  console.log(JSON.stringify(props));

  return (
    props.value ?
        <Rectangle width={4} fill={props.fill} stroke={props.stroke} height={props.height} x={props.cx} y={+20}></Rectangle>
      :null
  );
};
export default ReferenceLineDot;

ReferenceLineDot.propTypes = {
  alert: PropTypes.bool,
  className: PropTypes.string,
  r: PropTypes.number,
  selected: PropTypes.bool,
  fill: "#ddd",
  stroke: "#ddd",
  strokeWidth:1
};

ReferenceLineDot.defaultProps = {
  alert: false,
  className: '',
  r: 3,
  selected: false,
};

