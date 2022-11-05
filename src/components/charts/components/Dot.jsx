/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dot as RechartsDot } from 'recharts';

import { buildClass } from './className';

const isAlert = ({ yLineIsAlert }) => {
  return Boolean(yLineIsAlert);
};

const Dot = ({ className, r, alert, selected, ...props }) => {
  return (
    <RechartsDot
      {...props}
      className={classNames(buildClass(className), {
        [buildClass(`${className}--alert`)]: alert,
        [buildClass(`${className}--selected`)]: selected,
      })}
      r={r}
    />
  );
};

Dot.propTypes = {
  alert: PropTypes.bool,
  className: PropTypes.string,
  r: PropTypes.number,
  selected: PropTypes.bool,
};

Dot.defaultProps = {
  alert: false,
  className: '',
  r: 6,
  selected: false,
};

const payloadPropType = {
  payload: PropTypes.shape({
    yLineIsAlert: PropTypes.bool,
  }).isRequired,
};

export const ActiveLineDotWithAlert = ({ payload, ...props }) => (
  <Dot alert={isAlert(payload)} className="__chart-line__dot" {...props} />
);

ActiveLineDotWithAlert.propTypes = payloadPropType;

export const ActiveDashedDotWithAlert = ({ payload, ...props }) => (
  <Dot alert={isAlert(payload)} className="__chart-dashed__dot" {...props} />
);

ActiveDashedDotWithAlert.propTypes = payloadPropType;

export const InactiveDot = ({ payload, index, activeLinePointIndex, ...props }) => {
  const alert = isAlert(payload);
  const selected = index === activeLinePointIndex;

  return alert ? (
    <Dot
      alert
      className="__chart-line__inactive-dot"
      {...props}
      r={selected ? 5 : 4}
      selected={selected}
    />
  ) : null;
};

InactiveDot.propTypes = {
  activeLinePointIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
  ...payloadPropType,
};

InactiveDot.defaultProps = {
  activeLinePointIndex: null,
};
