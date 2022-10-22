/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { Edit, Delete, Close, Checkmark } from '@carbon/icons-react';
import  settings  from '../../settings';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslation } from '../../translation';
import Button from '../button/Button';
import TextInput from '../text-input';
import InlinePopup from '../inline-popup/InlinePopup';
import OverflowMenu, { OverflowMenuItem } from '../overflow-menu';

import { TableRow, TableCell } from './DataTable';

const { prefix } = settings;

const ActionsCell = ({ onEdit, onDelete, editable, onSave, onClose }) => {
  const { t } = useTranslation();

  if (editable) {
    return (
      <div className={`${prefix}--row-buttons`}>
        <Button
          hasIconOnly
          iconDescription={t('Save')}
          onClick={onSave}
          renderIcon={<Checkmark size={16} />}
          tooltipAlignment="center"
          tooltipPosition="top"
        />
        <Button
          hasIconOnly
          iconDescription={t('Cancel')}
          onClick={onClose}
          renderIcon={<Close size={16} /> }
          tooltipAlignment="center"
          tooltipPosition="top"
        />
      </div>
    );
  }

  return (
    <div className={`${prefix}--row-buttons`}>
      <Button
        hasIconOnly
        iconDescription={t('Edit')}
        onClick={onEdit}
        renderIcon={<Edit size={16} />}
        tooltipAlignment="center"
        tooltipPosition="top"
      />
      <InlinePopup
        align="start"
        className={classNames(
          `${prefix}--inline-popup-confirmation`,
          `${prefix}--delete-row-confirmation`
        )}
        direction="top"
        iconDescription="DeleteRowPopup"
        renderActions={renderActionsData => {
          const { onClose } = renderActionsData;
          return (
            <div className={`${prefix}--inline-popup__actions`}>
              <Button kind="tertiary" onClick={onClose} size="small">
                {t('Cancel')}
              </Button>
              <Button
                kind="primary"
                onClick={() => {
                  onClose();
                  onDelete();
                }}
                size="small"
              >
                {t('Delete')}
              </Button>
            </div>
          );
        }}
        text={t('Are you sure you want to delete this row? This action cannot be undone.')}
        triggerNode={
          <Button
            aria-label={t('Delete')}
            hasIconOnly
            iconDescription={t('Delete')}
            renderIcon={<Delete size={16} />}
            tooltipAlignment="center"
            tooltipPosition="top"
          />
        }
      />
      <OverflowMenu flipped>
        <OverflowMenuItem itemText="Option" primaryFocus />
        <OverflowMenuItem itemText="Option" />
        <OverflowMenuItem itemText="Option" />
      </OverflowMenu>
    </div>
  );
};

ActionsCell.propTypes = {
  editable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const EditableTableRow = ({ row: initialRow, onChange, onDelete, onEdit, ...otherProps }) => {
  const [row, setRow] = React.useState(initialRow);
  const [editable, setEditable] = React.useState(false);
  const [cells, setCells] = React.useState([...row.cells]);

  const onEditRow = () => {
    setEditable(true);
  };

  const onCancelChanges = () => {
    setCells(() => [...row.cells]);
    setEditable(false);
  };

  const onSaveRow = () => {
    setRow(() => ({
      ...row,
      cells,
    }));
    setEditable(false);
    onChange(row);
  };

  const onDeleteRow = () => {
    onDelete(row);
  };

  const onChangeCell = cells => (value, id) => {
    setCells(() =>
      cells.map(cell => {
        if (cell.id === id) {
          return {
            ...cell,
            value,
          };
        }

        return cell;
      })
    );
  };

  return (
    <TableRow {...otherProps}>
      {row.cells.map(cell => {
        return (
          <TableCell key={cell.id}>
            {cell.info.header === 'actions' ? (
              <ActionsCell
                editable={editable}
                onClose={onCancelChanges}
                onDelete={onDeleteRow}
                onEdit={onEditRow}
                onSave={onSaveRow}
              />
            ) : editable ? (
              <TableTextInput id={cell.id} onChangeCell={onChangeCell(cells)} value={cell.value} />
            ) : (
              cell.value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

EditableTableRow.propTypes = {
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  row: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

EditableTableRow.defaultProps = {
  onChange: () => {},
  onDelete: () => {},
};

const TableTextInput = ({ value: initialValue, onChangeCell, id }) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    const inputValue = e.target.value;

    setValue(() => inputValue);
    onChangeCell(inputValue, id);
  };
  return <TextInput id={id} onChange={onChange}  value={value} />;
};

TableTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChangeCell: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EditableTableRow;
