/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import PropTypes from 'prop-types';
import React, { memo, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import  settings  from '../../settings';
import {
  ChevronRight,
  Folder as FolderIcon,
  Document as DocumentIcon,
} from '@carbon/icons-react';

import ExpandableHoC from './ExpandableHoC';
import InlineCheckbox from './InlineCheckbox';

const { prefix } = settings;

const defaultRenderExpando = props => <button type="button" {...props} />;

const DotIcon = ({ className }) => (
  <span className={classnames(`${prefix}--dot-icon`, className)} />
);

export const renderIconByType = (id, type, iconDescription, expands, isChecked, onCheckboxChange, isIndeterminate,
  { className, ...iconProps } = {}) => {
  const types = {
    root: (
      <ChevronRight
        size={16}
        aria-label={iconDescription}
        className={classnames(
          `${prefix}--tree-item__arrow`,
          `${prefix}--tree-item__icon`,
          className
        )}
        {...iconProps}
      />
    ),

    file: (
      <DocumentIcon
        size={16}
        aria-label={iconDescription}
        className={classnames(`${prefix}--tree-item__icon`, className)}
        {...iconProps}
      />
    ),
    folder: (
      <FolderIcon
        size={16}
        aria-label={iconDescription}
        className={classnames(`${prefix}--tree-item__icon`, className)}
        {...iconProps}
      />
    ),
    item: (
      <DotIcon className={classnames(`${prefix}--tree-item__icon`, className)} {...iconProps} />
    ),

    checkbox: (
      <>
        <InlineCheckbox
          ariaLabel={iconDescription}
          className={classnames(
            `${prefix}--tree-item__checkbox-group`,
            `${prefix}--tree-item__icon`,
            className
          )}
          checked={isChecked}
          disabled={false}
          id={"checkbox-" + id}
          // indeterminate={indeterminate || (anySelected && !indeterminate && !allSelected)}
          indeterminate={isIndeterminate}
          name={"checkbox-name-" + id}
          onChange={(checked) => {onCheckboxChange(checked, id)}}
          // onClick={(evt) => {console.log(evt)}}
        />
        { expands && <ChevronRight size={16}
          aria-label={iconDescription}
          className={classnames(
            `${prefix}--tree-item__arrow`,
            `${prefix}--tree-item__icon`,
            className
          )}
          {...iconProps}
        />}
        { !expands &&  <div className={`${prefix}--tree-item__spacer`} />  }
      </>
    ),
  };
  return types[type];
};

const TreeItem = memo(props => {
  const {
    t,
    id,
    key,
    disabled,
    className,
    title = "",
    renderExpando: Expando,
    expands,
    iconDescription = "",
    children,
    type,
    open,
    targetClassName,
    handleHeadingClick,
    handleHeadingKeyDown,
    divided,
    selectable,
    isSelected,
    onSelect,
    isChecked,
    onCheckboxChange,
    isIndeterminate,
    renderIconByType,
    level,
    isRoot,
    ...domProps
  } = props;
  const classNames = useMemo(
    () =>
      classnames(
        {
          [`${prefix}--tree-item--active`]: open,
          [`${prefix}--tree-item--divided`]: divided,
          [`${prefix}--tree-item--selectable`]: selectable,
          [`${prefix}--tree-item--selected`]: isSelected,
        },
        `${prefix}--tree-item`,
        className
      ),
    [open, divided, selectable, isSelected, className]
  );

  const buttonClassName = useMemo(
    () =>
      classnames(
        `${prefix}--tree-item__heading`,
        { [`${prefix}--tree-item__heading--disabled`]: disabled },
        { [`${prefix}--tree-item__heading--selected`]: selectable ? isSelected : open }
      ),
    [disabled, selectable, isSelected, open]
  );

  const onExpandIconClick = useCallback(
    e => {
      e.stopPropagation();
      handleHeadingClick();
    },
    [handleHeadingClick]
  );

  const expandoClassName = useMemo(
    () =>
      classnames(buttonClassName, targetClassName, {
        [`${buttonClassName}--expands`]: expands,
      }),
    [buttonClassName, targetClassName, expands]
  );

  const extraPaddingForRootItem = 1.4;
  const extraPaddingForCommonItem = 2.4;
  const paddingLeftRemValue = useMemo(
    () =>
      selectable
        ? isRoot
          ? level + extraPaddingForRootItem
          : level + extraPaddingForCommonItem
        : level,
    [selectable, isRoot, level]
  );
  const expandoPaddingLeft = useMemo(
    () => ({ paddingLeft: level ? `${paddingLeftRemValue*2}rem` : undefined }),
    [level, paddingLeftRemValue]
  );
  const expandoTitle = useMemo(() => (expands ? iconDescription : ''), [iconDescription, expands]);
  const expandoOnClick = useMemo(() => (selectable ? onSelect : handleHeadingClick), [
    selectable,
    onSelect,
    handleHeadingClick,
  ]);

  const expandableIcon = useMemo(() => {
    if (expands && selectable) {
      return renderIconByType('root', 'Arrow', {
        className: `${prefix}--tree-item__icon--expand`,
        onClick: onExpandIconClick,
      });
    }
    return null;
  }, [expands, selectable, renderIconByType, onExpandIconClick]);
  const iconByType = useMemo(() => renderIconByType(id, type, iconDescription, expands, isChecked, onCheckboxChange, isIndeterminate), [
    renderIconByType,
    id,
    type,
    iconDescription,
    expands,
    isChecked,
    onCheckboxChange,
    isIndeterminate,
  ]);

  return (
    <li className={classNames} {...domProps}>
      <Expando
        aria-expanded={open}
        className={expandoClassName}
        disabled={disabled}
        onClick={expandoOnClick}
        onKeyDown={handleHeadingKeyDown}
        readonly={!expands}
        style={expandoPaddingLeft}
        title={expandoTitle}
        type="button"
      >
        {expandableIcon}
        {iconByType}
        <div className={`${prefix}--tree-item__title`}>{title}</div>
      </Expando>
      {open && <div className={`${prefix}--tree-item__content`}>{children}</div>}
    </li>
  );
});

TreeItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  divided: PropTypes.bool,
  expands: PropTypes.bool,
  handleHeadingClick: PropTypes.func,
  handleHeadingKeyDown: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  iconDescription: PropTypes.string,
  isRoot: PropTypes.bool,
  isChecked: PropTypes.bool,
  isSelected: PropTypes.bool,
  level: PropTypes.number,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  renderExpando: PropTypes.func,
  renderIconByType: PropTypes.func,
  selectable: PropTypes.bool,
  targetClassName: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.node,
  type: PropTypes.string,
};

const noop = () => {};

TreeItem.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  divided: false,
  expands: false,
  handleHeadingClick: noop,
  handleHeadingKeyDown: noop,
  isRoot: false,
  isChecked: false,
  isSelected: false,
  level: undefined,
  onSelect: () => {},
  open: false,
  renderExpando: defaultRenderExpando,
  renderIconByType,
  selectable: false,
  targetClassName: '',
  type: 'item',
};

export default ExpandableHoC(TreeItem);
