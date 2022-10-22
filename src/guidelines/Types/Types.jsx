/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { StructuredListRow, StructuredListCell } from '@carbon/react';
import  settings from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

const Types = ({ variable, body, textStyle }) => {
  return (
    <StructuredListRow>
      <StructuredListCell>
        <p style={textStyle}>{body}</p>
      </StructuredListCell>
      <StructuredListCell className={`${prefix}--types-code`} noWrap>
        <span>{variable}</span>
      </StructuredListCell>
    </StructuredListRow>
  );
};

Types.propTypes = {
  /**
   * body display the text body
   */
  body: PropTypes.string,
  /**
   * textStyle apply style to the body
   */
  textStyle: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.number,
    letterSpacing: PropTypes.string,
    lineHeight: PropTypes.string,
  }),
  /**
   * variable display the variable name of style
   */
  variable: PropTypes.string,
};

Types.defaultProps = {
  body: 'This is for inline code snippets and smaller code elements',
  textStyle: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '.32px',
  },
  variable: '$code-01',
};

export default Types;
