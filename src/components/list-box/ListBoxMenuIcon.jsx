/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';
import classNames from 'classnames';
import { ChevronDown} from '@carbon/icons-react';

const { prefix } = settings;

const ListBoxMenuIcon = ({ isOpen, translateWithId: t }) => {
  const className = classNames(`${prefix}--list-box__menu-icon`, {
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      <ChevronDown size={16} aria-label={description} name="chevron--down">
        <title>{description}</title>
      </ChevronDown>
    </div>
  );
};
ListBoxMenuIcon.propTypes = {
  isOpen: PropTypes.bool,
  translateWithId: PropTypes.func,
};
ListBoxMenuIcon.defaultProps = {
  isOpen: false,
  translateWithId: thing => thing,
};

export default ListBoxMenuIcon;
