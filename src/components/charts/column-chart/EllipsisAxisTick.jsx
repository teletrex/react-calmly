/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'recharts';
import maxBy from 'lodash/maxBy';

import { axisTypes } from './utilities';

/*
https://github.com/recharts/recharts/issues/961
This component is responsible for truncating ticks inside the rechart 
charts in both quantity of lines and maximum width for single line.

maxLines - used for limiting amount of lines in single tick
width - used for limiting maximum length for single world
*/

const EllipsisAxisTick = ({ axis, labelAngle, maxLines, payload, tickFormatter, ...rest }) => {
  const [text, setText] = useState(payload.value);
  const [suffix, setSuffix] = useState('');

  const formattedValue = useMemo(
    () => (tickFormatter ? tickFormatter(payload.value) : payload.value),
    [payload.value]
  );

  const measuredRef = useCallback(
    node => {
      if (node === null) {
        return;
      }

      const getWordsByLines = (node, children) => node.getWordsByLines({ ...rest, children }, true);

      let tempText = formattedValue?.toString() ?? '';

      let wordsByLines = getWordsByLines(node, tempText);
      let longestLine = maxBy(wordsByLines, 'width');

      const calculatedAngle = labelAngle * (Math.PI / 180);
      const wordInclination =
        axis === axisTypes.x
          ? Math.abs(Math.sin(calculatedAngle))
          : Math.abs(Math.cos(calculatedAngle));
      const axisLabelSpace = axis === axisTypes.x ? rest.height : rest.width;
      const wordLengthLimit = axisLabelSpace / wordInclination;
      const tempSuffix =
        wordsByLines.length > maxLines || longestLine.width > wordLengthLimit ? '…' : '';

      while (wordsByLines.length > maxLines || (longestLine.width > wordLengthLimit && tempText)) {
        tempText = tempText.slice(0, -1);
        wordsByLines = getWordsByLines(node, tempText + tempSuffix);
        longestLine = maxBy(wordsByLines, 'width');
      }

      if (tempText !== text) {
        setText(tempText);
        setSuffix(tempSuffix);
      }
    },
    [axis, labelAngle, maxLines, rest, text, payload]
  );

  return (
    <g>
      <Text {...rest} ref={measuredRef}>
        {text + suffix}
      </Text>
      <title>{payload.value}</title>
    </g>
  );
};

EllipsisAxisTick.defaultProps = {
  ...Text.defaultProps,
  axis: axisTypes.x,
  payload: {},
  tickFormatter: undefined,
};

EllipsisAxisTick.propTypes = {
  ...Text.propTypes,
  axis: PropTypes.oneOf(Object.values(axisTypes)).isRequired,
  labelAngle: PropTypes.number,
  maxLines: PropTypes.number.isRequired,
  payload: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  tickFormatter: PropTypes.func,
};

export default EllipsisAxisTick;
