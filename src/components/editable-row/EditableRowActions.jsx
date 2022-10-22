/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useMemo } from 'react';
import { Checkmark, Close,  Edit } from '@carbon/icons-react';
import settings from '../../settings';
import classNames from 'classnames';
import {useTranslation} from '../../translation';
import {
  Button,

} from '@carbon/react';

import { EditableCellRendererDefaults, EditableCellRendererPropTypes } from './prop-types';

const { prefix } = settings;


export const EditableRowActions = ({ children, rowActions, isEditing, tableLocked, callForTableLock, releaseTableLock}) => {

  const { t } = useTranslation();

  const { deleteRow, edit, editCancel, editCommit } = useMemo(() => rowActions, [rowActions]);

  const checkEdit = (event) => {
    if ((typeof callForTableLock == "undefined") || callForTableLock(event))
      edit(event)
  }
  const checkEditCommit = (event) => {
    if ((typeof releaseTableLock == "undefined") || releaseTableLock(event))
      editCommit(event)
  }
  const checkEditCancel = (event) => {
    if ((typeof releaseTableLock == "undefined") || releaseTableLock(event))
      editCancel(event)
  }

  if (isEditing) {
    return (
      <div
        className={classNames(
          `${prefix}--row-actions-cell`,
          `${prefix}--row-actions-cell-editable`
        )}
      >
        <Button
          key="saveBtn"
          className={`${prefix}--row-actions-cell-button`}
          hasIconOnly
          iconDescription={t('save')}
          onClick={checkEditCommit}
          renderIcon={Checkmark16}
          showTooltip={false}
          title={t('save')}
          tooltipAlignment="center"
          tooltipPosition="left"
        />
        <Button
          key="cancelBtn"
          className={`${prefix}--row-actions-cell-button`}
          hasIconOnly
          iconDescription={t('cancel')}
          onClick={checkEditCancel}
          renderIcon={Close16}
          showTooltip={false}
          title={t('cancel')}
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </div>
    );
  }

  return (
    <div
      className={classNames(`${prefix}--row-actions-cell`, `${prefix}--row-actions-cell-editable`)}
    >
      <Button
        key="editBtn"
        className={`${prefix}--row-actions-cell-button` + (tableLocked ? " hideedit":null)}
        hasIconOnly
        iconDescription={t('edit')}
        onClick={checkEdit}
        renderIcon={Edit16}
        showTooltip={false}
        title={t('edit')}
        tooltipAlignment="center"
        tooltipPosition="left"
      />
      {/* <InlinePopup
        align="end"
        className={classNames(
          `${prefix}--inline-popup-confirmation`,
          `${prefix}--delete-row-confirmation`
        )}
        direction="top"
        iconDescription="DeleteRowPopup"
        renderActions={renderActionsData => {
          const { onClose } = renderActionsData;
          return (
            <div className={POPUP_ACTIONS_CLASS}>
              <Button key="cancelDeleteBtn" kind="tertiary" onClick={onClose} size="small">
                {t('cancel')}
              </Button>
              <Button
                key="confirmDeleteBtn"
                kind="primary"
                onClick={e => {
                  onClose();
                  deleteRow(e);
                }}
                size="small"
              >
                {t('delete')}
              </Button>
            </div>
          );
        }}
        tabIndex={-1}
        text={t('deleteDesc')}
        triggerNode={
          <Button
            key="deleteBtn"
            aria-label={t('delete')}
            className={`${prefix}--row-actions-cell-button`}
            hasIconOnly
            iconDescription={t('delete')}
            renderIcon={Delete16}
            showTooltip={false}
            title={t('delete')}
            tooltipAlignment="center"
            tooltipPosition="bottom"
          />
        }
      /> */}
      {children}
    </div>
  );
};

EditableRowActions.propTypes = {
  ...EditableCellRendererPropTypes,
};

EditableRowActions.defaultProps = {
  ...EditableCellRendererDefaults,
};
