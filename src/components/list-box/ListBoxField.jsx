/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import React from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';

const { prefix } = settings;

const ListBoxField = React.forwardRef(({ children, id, disabled, tabIndex, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      aria-controls={(rest['aria-expanded'] && `${id}__menu`) || null}
      aria-haspopup="listbox"
      aria-owns={(rest['aria-expanded'] && `${id}__menu`) || null}
      className={`${prefix}--list-box__field`}
      role={rest['aria-expanded'] ? 'combobox' : rest.role || 'combobox'}
      tabIndex={(!disabled && tabIndex) || -1}
      {...rest}
    >
      {children}
    </div>
  );
});

ListBoxField.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
ListBoxField.defaultProps = {
  children: undefined,
  disabled: false,
  tabIndex: '',
};

export default ListBoxField;
