/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import { useMemo, useReducer, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import isNil from 'lodash/isNil';

const actionType = Symbol('rowActionType');

// row editing actions
const reAction = Object.freeze({
  DELETE: 'rowDelete',
  EDIT: 'rowEdit',
  EDIT_CHANGE: 'rowEditChange',
  CANCEL: 'rowEditCancel',
  COMMIT: 'rowEditCommit',
});

// row editing statuses
const reStatus = Object.freeze({
  DEFAULT: 'init',
  EDITING: 'editing',
  MODIFIED: 'modified',
});

const rowDeleteAction = (row, event) => {
  return {
    [actionType]: reAction.DELETE,
    row,
    event,
  };
};

const rowEditAction = (row, event) => {
  return {
    [actionType]: reAction.EDIT,
    row,
    event,
  };
};

const rowEditCancelAction = (row, event) => {
  return {
    [actionType]: reAction.CANCEL,
    row,
    event,
  };
};

const rowEditChangeAction = (row, event, cellId, cellValue) => {
  return {
    [actionType]: reAction.EDIT_CHANGE,
    row,
    event,
    cellId,
    cellValue,
  };
};

const rowEditCommitAction = (row, event) => {
  return {
    [actionType]: reAction.COMMIT,
    row,
    event,
  };
};

const rowStateInitial = () => {
  return {
    modifiedValues: {},
    editStatus: reStatus.DEFAULT,
    prevEditStatus: reStatus.DEFAULT,
  };
};

const rowStateReducer = (state, action) => {
  const { editStatus: currentStatus, prevEditStatus } = state;

  const performAction = action[actionType];
  const {
    row: { disabled },
  } = action;

  switch (performAction) {
    case reAction.EDIT:
      return !disabled && currentStatus !== reStatus.EDITING
        ? {
            ...state,
            editStatus: reStatus.EDITING,
            prevEditStatus: currentStatus,
            modifiedValues: {},
          }
        : state;
    case reAction.EDIT_CHANGE: {
      const { cellId, cellValue } = action;
      if (!isNil(cellId) && currentStatus === reStatus.EDITING) {
        const { modifiedValues } = state;
        return {
          ...state,
          modifiedValues: { ...Object.assign(modifiedValues, { [cellId]: cellValue }) },
        };
      }
      return state;
    }
    case reAction.DELETE:
      return state;
    case reAction.COMMIT:
      return currentStatus === reStatus.EDITING
        ? {
            ...state,
            editStatus: reStatus.MODIFIED,
            prevEditStatus: reStatus.MODIFIED,
          }
        : state;
    case reAction.CANCEL:
      return currentStatus === reStatus.EDITING
        ? { ...state, editStatus: prevEditStatus, prevEditStatus, modifiedValues: {} }
        : state;
    default:
      return state;
  }
};

export const useEditableRow = (config = {}) => {
  const {
    row,
    onRowEditCommit = noop,
    onRowDelete = noop,
    canEditRow = noop
  } = config;

  const [rowState, setRowState] = useReducer(
    rowStateReducer,
    { ...rowStateInitial() },
    undefined);

  const { editStatus, modifiedValues } = rowState;
  const isEditing = editStatus === reStatus.EDITING;


  const editedCellValues = useRef(modifiedValues);
  editedCellValues.current = modifiedValues;
  const rowActions = useMemo(() => {
    const deleteRow = event => {
      setRowState(rowDeleteAction(row, event));
      onRowDelete(row.id);
    };

    const edit = event => {
      if (canEditRow(row.id)) {
        setRowState(rowEditAction(row, event));
        }
    };

    const editCancel = event => {
      setRowState(rowEditCancelAction(row, event));
    };

    const editChange = (event, cellId, cellValue) => {
      setRowState(rowEditChangeAction(row, event, cellId, cellValue));
    };

    const editCommit = event => {
      setRowState(rowEditCommitAction(row, event));
      if (!isEmpty(editedCellValues.current)) {
        onRowEditCommit(row.id, editedCellValues.current);
      }
    };

    return {
      deleteRow,
      edit,
      editCancel,
      editChange,
      editCommit,
    };
  }, [row, onRowDelete, onRowEditCommit, canEditRow]);

  return {
    isEditing,
    editStatus,
    editedCellValues,
    rowActions,
  };
};
