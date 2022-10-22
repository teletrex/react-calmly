/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '@carbon/react';
import { defaultClassName } from '../constants';

const Footer = ({ t, onApplyClick, onResetClick, isResetDisabled, isApplyDisabled }) => {

  return (
    <div className={`${defaultClassName}__footer`}>
      <Button
        key={"reset"}
        className={`${defaultClassName}__footer-btn`}
        disabled={isResetDisabled}
        kind="secondary"
        onClick={onResetClick}
      >
        {t('Reset')}
      </Button>
      <Button
        key={"apply"}
        className={`${defaultClassName}__footer-btn`}
        disabled={isApplyDisabled}
        kind="primary"
        onClick={onApplyClick}
      >
        {t('Apply')}
      </Button>
    </div>
  );
};

Footer.propTypes = {
  isApplyDisabled: PropTypes.bool,
  isResetDisabled: PropTypes.bool,
  onApplyClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  isApplyDisabled: false,
  isResetDisabled: false,
};

export default Footer;
