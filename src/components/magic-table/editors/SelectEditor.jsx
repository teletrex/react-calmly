/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState,useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Portal from '../components/Portal';
import ClickAwayListener from "../../click-away-listener";


const SelectEditor = (
  {
    id,
    row,
    menuItems,
    column,
    format,
    initialValue,
    selectLabel,
    invalidText,
    onCellChange,
    onCellBlur,
    onCellClick,
    disabled
  }
  ) => {

  let isUndefined = (initialValue === undefined || initialValue === '');
  const [clicked, setClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentGridParent, setCurrentGridParent] = useState(null);

  const handleSelect = (event,selectedValue) => {
    if (disabled) return;
    setSelectedValue(selectedValue);
    // initialValue = selectedValue;
    if (onCellChange)
      onCellChange(event, column, row.id, row, selectedValue, initialValue, format);  // let's just return the row index for the row.

    setOpen(false);
  };

  const handleBlur = (event) => {
    if (disabled) return;
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    if (onCellBlur) {
      onCellBlur(event, column, row.id, row, selectedValue, initialValue, format);  // go out set the data and set the cell to the formatted response.
    }
    //initialValue = selectedValue;
  }

  const handleOnClick = (event, selectEditorMenu) => {
    if (disabled) return;
    setOpen(!open); // state updates later so does not affect the next line.
    if (open) return; // this handler handles the click to open the drop down menu, not selecting an item.

    const selectedValue = event.target.value;
    const dropdownElement = event.target.offsetParent;
    (typeof onCellClick == "function") &&
      onCellClick(event, column, row.id, row, selectedValue, initialValue, format);
    setClicked(true);

    let gridParent=event.target;

    while (gridParent.className !== "magictable-scroller" ) {
//      console.log("gp classname -> "+ gridParent.className);
      gridParent = gridParent.offsetParent;
    }

    setCurrentGridParent(gridParent);

    const alignedDropdownTop =
      gridParent.offsetTop +
      gridParent.offsetParent.offsetTop +
      dropdownElement.offsetTop +
      dropdownElement.offsetHeight -
      gridParent.scrollTop -
      1;

    if (alignedDropdownTop + Math.min(menuItems.length * 33.3, 220) >
      gridParent.offsetParent.offsetTop +
      gridParent.offsetTop +
      gridParent.offsetHeight) {

      setDropdownTop(
        gridParent.offsetParent.offsetTop +
        gridParent.offsetTop +
        gridParent.offsetHeight -
        Math.min(menuItems.length * 33.3, 220)
      );
    } else setDropdownTop(alignedDropdownTop);

    setDropdownLeft(Math.max(
      dropdownElement.offsetLeft +
      gridParent.offsetLeft +
      gridParent.offsetParent.offsetLeft -
      gridParent.scrollLeft,0));

    setDropdownWidth(Math.max(dropdownElement.offsetWidth,100));

    const onScroll = e => {

      const alignedDropdownTop =
        gridParent.offsetTop +
        gridParent.offsetParent.offsetTop +
        dropdownElement.offsetTop +
        dropdownElement.offsetHeight -
        gridParent.scrollTop -
        1;

      setDropdownTop(Math.min(
        alignedDropdownTop,
        alignedDropdownTop +
        gridParent.offsetParent.offsetHeight -
        Math.min(menuItems.length*50,220))
      );

      setDropdownLeft(Math.max(
        dropdownElement.offsetLeft +
        gridParent.offsetLeft +
        gridParent.offsetParent.offsetLeft -
        gridParent.scrollLeft,0)
      )
    };
    // gridParent.addEventListener("scroll", onScroll);
    // This sortof works, but has bigger issues. So leave out.

  }


  useEffect( () => {
      const currentSelections = menuItems.filter(item => item.value === selectedValue );
      if (currentSelections.length >0) {
        setSelectedLabel(currentSelections[0].label)
      } else setSelectedLabel(selectLabel)
    },[initialValue, menuItems, selectedValue]
  );

//    !(typeof onCellClick == "function"));
  const selectEditorRef = useRef(null);
  const selectEditorMenu = useRef(null);
  console.log("SelectEditor is deprecated, still functional, please use ComboSelectEditor, it defaults to SelectEditor functionality.")
  console.log("In a grid, no changes are needed, all dropdowns will use the ComboSelectEditor.");

  return (
    <ClickAwayListener onClickAway={()=> setOpen(false)}>
      <div>
        <div ref={selectEditorRef} className={"bx--select-editor"} disabled={disabled}>
          <div className={"bx--select-value" + (open && "-focus"||"")}
               onClick={(evt) => handleOnClick(evt,menuItems)}>
            <div className={"bx--select-text"}>
              { selectedLabel}
            </div>
          </div>
        </div>
        { open &&
          <Portal rootId={"select-editor-menulist"}>

            <div className={"bx--select-menu"}
                 onClick={handleOnClick}
                 ref={selectEditorMenu}
                 style={{top:dropdownTop+"px", left:dropdownLeft+"px"}}
            >
              <div className={"bx--select-menu-scroll"}>
                <div className={"bx--select-option"}
                     name={"_unselected"}
                     key={"_unselected"}
                     onClick={(event) => handleSelect(event, null)}
                />
                {menuItems && menuItems.map(item =>
                  <div className={"bx--select-option"}
                       name={item.label}
                       key={item.value}
                       value={item.value}
                       onClick={(event) => handleSelect(event, item.value)}
                  >{item.label}
                  </div>
                )
                }
              </div>
            </div>
          </Portal>
        }
      </div>
    </ClickAwayListener>
  );
};

export default SelectEditor;

SelectEditor.propTypes = {
  onCellBlur : PropTypes.func,
  onCellChange: PropTypes.func,
  selectLabel : PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), /* value in the value parameter of the option tag. */
  menuItems: PropTypes.arrayOf( PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  multiple: PropTypes.bool
}

SelectEditor.defaultProps = {
  selectLabel : "",
  multiple: false
}
