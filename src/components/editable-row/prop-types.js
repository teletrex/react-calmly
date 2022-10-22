/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import PropTypes from 'prop-types';

export const EditableCellRendererPropTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  column: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  row: PropTypes.shape({
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isEditing: PropTypes.bool,
  rowActions: PropTypes.shape({
    deleteRow: PropTypes.func,
    edit: PropTypes.func,
    editCancel: PropTypes.func,
    editChange: PropTypes.func,
    editCommit: PropTypes.func,
  }).isRequired,
};

export const EditableCellRendererDefaults = {
  className: '',
  isEditing: false,
};
