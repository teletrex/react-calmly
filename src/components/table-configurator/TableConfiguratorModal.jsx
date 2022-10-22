/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState } from 'react';
import PropTypes from 'prop-types';
import  settings  from '../../settings';

import {Modal} from '@carbon/react';
import TableConfigurator from './TableConfigurator';

const { prefix } = settings;

const TableConfiguratorModal = ({
  reportName,
  aggregationLevel,
  gridDefinition,
  userGridPreferences,
  t,
  open,
  ariaLabel,
  className,
  modalHeading,
  onRequestClose,
//  renderActionsPolicy,
//  renderActions,
  onSubmit,
//  closeOnSubmit,
//  selectorPrimaryFocus,
  ...props
}) => {

  const [modalData,setModalData] = useState({});

  const handleUserGridPreferencesChanged = (updatedGridPreferences) => setModalData(updatedGridPreferences)

  const checkAndRequestSubmitHandler =  () => {
      onSubmit(modalData)  // handleSubmit will come from the eleven grid component.
  }

  return (

        <Modal
          className={`${prefix}--modal-table-configurator`}
          aria-label={ariaLabel}
          isLarge
          modalHeading={modalHeading}
          onRequestClose={onRequestClose}
          onRequestSubmit={checkAndRequestSubmitHandler}
          open={open}
          {...props}
          >
          <TableConfigurator
            t={t}
            reportName = {reportName}
            aggregationLevel = {aggregationLevel}
            gridDefinition = {gridDefinition}
            userGridPreferences = {userGridPreferences}
            onUserGridPreferencesChanged = {handleUserGridPreferencesChanged}
            {...props}
            />
        </Modal>
    );
  }


TableConfiguratorModal.propTypes = {
  t: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  reportName: PropTypes.string,
  aggregationLevel: PropTypes.string,
  gridDefinition: PropTypes.object,
  userGridPreferences: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  closeOnCancel: PropTypes.bool, // to additional perform call onClose when multistep results are cancelled
  closeOnSubmit: PropTypes.bool, // to additional perform call onClose when multistep results are submitted
  editHeaderLabel: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  renderActions: PropTypes.func,
  renderActionsPolicy: PropTypes.oneOfType([PropTypes.oneOf(['none', 'default']), PropTypes.func]),
  selectorPrimaryFocus: PropTypes.string,
  selfCloseWhenCancelled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  submitButtonLabel: PropTypes.string,
};

TableConfiguratorModal.defaultProps = {
  modalHeading:'Configure Report',
  className: '',
  closeOnCancel: true,
  closeOnSubmit: true,
  editHeaderLabel: '',
  open: false,
  selectorPrimaryFocus: `.${prefix}--modal-content`,
  selfCloseWhenCancelled: true, // to keep existed behavior, allow to correct manage via open prop only; better to not have it at all
};

export default TableConfiguratorModal;
