/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import  settings  from '../../settings';
import PropTypes from 'prop-types';

const { prefix } = settings;

const ListBoxMenu = React.forwardRef(({ children, id, ...rest }, ref) => {
  return (
    <div
      className={`${prefix}--list-box__menu`}
      id={`${id}__menu`}
      role="listbox"
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
});

ListBoxMenu.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default ListBoxMenu;
