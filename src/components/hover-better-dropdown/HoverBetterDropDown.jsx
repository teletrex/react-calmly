/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {ExtendedDropdown} from '../dropdown';


const HoverBetterDropDown = (
  {
    items,
    itemToElement,
    itemToString,
    selectedItem,
    onChange,

    ...props

  }) => {

  const defaultItemToElement = item => {
    if (item) {
      if (item.title)
        return <div className="dropdown-group">{item.labelNoHover}</div>
      return <div className="dropdown-item">{item.labelNoHover}</div>
    } else return "";
  }

  const [itemsWithoutHover, setItemsWithoutHover] = useState(items);
  const [selectedItemWithoutHover, setSelectedItemWithoutHover] = useState(selectedItem );

  // set items
  useEffect(() => {
      setItemsWithoutHover(items.map(item => (
          {...item, labelNoHover: (itemToString ? itemToString(item) : item.label), label: null})
        )
      )
    }, [items]
  );

  // set items
  useEffect(() => {
      setSelectedItemWithoutHover(
        {...selectedItem, label: (itemToString ? itemToString(selectedItem) : selectedItem.label)});
    }, [selectedItem]
  );

  const handleOnChange = (selection) => {
    onChange && onChange({
      selectedItem: {
        ...selection.selectedItem,
        label: selection.selectedItem.labelNoHover
      }
    });
  }

  const myItemRenderer = (itemToElement == null) ? defaultItemToElement : itemToElement;

  return (
    <ExtendedDropdown
      items={itemsWithoutHover}
      itemToElement={myItemRenderer}
      selectedItem={selectedItemWithoutHover}
      onChange={handleOnChange}
      {...props}
    />
  );
}

export default React.memo(HoverBetterDropDown);

HoverBetterDropDown.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  filterByText: PropTypes.func,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  initialSelectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inline: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      }),
      PropTypes.string,
    ])
  ).isRequired,
  itemToElement: PropTypes.func,
  itemToString: PropTypes.func,
  keepOpenAfterSelect: PropTypes.bool,
  label: PropTypes.node,
  light: PropTypes.bool,
  onChange: PropTypes.func,
  onDropDownOpenChange: PropTypes.func,
  onSelect: PropTypes.func,
  searchPlaceHolderText: PropTypes.string,
  preventDefaultOnMouseDown: PropTypes.bool,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // eslint-disable-line react/require-default-props
  t: PropTypes.func,
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  translateWithId: PropTypes.func,
  withItemIcon: PropTypes.bool,
  withSearch: PropTypes.bool,
};

HoverBetterDropDown.defaultProps = {
  disabled: false,
  helperText: '',
  initialSelectedItem: null,
  inline: false,
  invalid: false,
  invalidText: '',
  itemToElement: null,
  keepOpenAfterSelect: false,
  light: false,
  onSelect: undefined,
  searchPlaceHolderText: '',
  preventDefaultOnMouseDown: true,
  titleText: '',
  type: 'default',
  withItemIcon: false,
  withPortal: false,
  withSearch: false,
};
