/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import PropTypes from 'prop-types';
import React from 'react';

import { useTranslation } from '../../translation';

const SvgTitleTag = ({ titleValue }) => {
  const { t } = useTranslation();
  return <title>{t(titleValue)}</title>;
};

SvgTitleTag.propTypes = {
  titleValue: PropTypes.string,
};

SvgTitleTag.defaultProps = {
  titleValue: '',
};

export default SvgTitleTag;
