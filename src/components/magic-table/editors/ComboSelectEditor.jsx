/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React,{useState,useEffect, useRef,useCallback} from 'react';
import PropTypes from 'prop-types';
import Portal from '../components/Portal';
import {TextInput} from "@carbon/react";
import ClickAwayListener from "../../click-away-listener";


const ComboSelectEditor = (
  {
    id,
    row,
    menuItems :menus,
    column,
    format,
    editorType,
    initialValue,
    selectLabel,
    invalidText,
    onCellChange,
    onCellBlur,
    onCellClick,
    disabled,
    nullable,
    allowTypeIn
  }
  ) => {

  let menuItems = null;

  if (typeof (menus.items) !== "undefined")
    menuItems = menus.items;

  if (typeof (menus.menusByRow) !== "undefined" && typeof (menus.menusByRow[row.id]) !== "undefined")
    menuItems = menus.menusByRow[row.id].items;

  if (menuItems === null) {
    menuItems = menus;
  }

  const menuStyleHeight = 28.8;
  const maxNumberOfMenuItemsShown = 7;

  useEffect( () => {
    setSelectedValue(initialValue );
  },[initialValue]);

  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(menuStyleHeight * maxNumberOfMenuItemsShown);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const [updatedMenuItems, setUpdatedMenuItems] = useState(menuItems);
  const [currentGridParent, setCurrentGridParent] = useState(null);
  const [currentDropdownElement, setCurrentDropdownElement] = useState(null);
  const [typeIn,setTypeIn] = useState(null);
  const [showTypeIn, setShowTypeIn] = useState(false);
  const [allowNewTypeIn,setAllowNewTypeIn] = useState(allowTypeIn);

  const [initialDirection, setInitialDirection] = useState("down");

  let localTypeIn = null;
  let prevLocalTypeIn = null;
  let localOpen = false;

  const openUp =() => {
    localOpen = true;
    setTypeIn(null);
    setFilteredMenuItems(updatedMenuItems);
    setOpen(localOpen);
  }

  const closeDown = () => {
    localOpen = false;
    setOpen(localOpen);
  }

  const handleSelect = (event,mySelectedValue) => {
    if (disabled) return;
    setSelectedValue(mySelectedValue);

    if (mySelectedValue !== null && allowNewTypeIn) {
      const menuItemsFound = menuItems.filter(item =>
      {
        if (typeof item.value === "string" && typeof mySelectedValue === "string") {
          return item.value.toLowerCase() === mySelectedValue.toLowerCase();
        }
        else {
          return item.value === mySelectedValue;
        }
      });

      var newMenuItems = [...menuItems];

      if (menuItemsFound.length === 0) {
        newMenuItems = [{label: mySelectedValue, value: mySelectedValue}, ...newMenuItems];
        setUpdatedMenuItems(newMenuItems);
        setFilteredMenuItems(newMenuItems);
      }
    }

    setTypeIn(null);
    if (onCellChange)
      onCellChange(event, column, row.id, row, mySelectedValue, initialValue, format, editorType);  // let's just return the row index for the row.
    closeDown();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && allowNewTypeIn) {
      const mySelectedValue = event.target.value;
      setSelectedValue(mySelectedValue);
      setTypeIn(mySelectedValue);
      if (onCellChange)
        onCellChange(event, column, row.id, row, mySelectedValue, initialValue, format, editorType);
      closeDown();
    }
  };


  const handleBlur = (event) => {
    if (disabled) return;
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    if (onCellBlur) {
      onCellBlur(event, column, row.id, row, selectedValue, initialValue, format, editorType);  // go out set the data and set the cell to the formatted response.
    }
  }

  // handle click to open/close dropdown.
  const handleOnClick = (event, selectEditorMenu) => {
    if (disabled) return;
    if (open)
      closeDown();
     else
      openUp();

    const selectedValue = event.target.value;
    const dropdownElement = event.target.offsetParent;

    setCurrentDropdownElement(dropdownElement);

    (typeof onCellClick == "function") &&
      onCellClick(event, column, row.id, row, selectedValue, initialValue, format, editorType);

    let gridParent = event.target;

    while (gridParent && (gridParent.className !== "magictable-scroller")) {
      gridParent = gridParent.offsetParent;
    }
    setCurrentGridParent(gridParent);
  };

  useEffect( () => {
    let menuItems = null;
    if (typeof (menus.items) !== "undefined")
      menuItems = menus.items;
    if (typeof (menus.menusByRow) !== "undefined" && typeof(menus.menusByRow[row.id]) !== "undefined")
      menuItems = menus.menusByRow[row.id].items;
    if (menuItems === null)
      menuItems = menus;
    if (menuItems === null)
      console.error("No menus for found for column '" + column +"' and row '" + row.id + "Passed in for menus: "+menus)
    setFilteredMenuItems(menuItems);
    setUpdatedMenuItems(menuItems);
  },[menus]);

  //const alignedDropdownTop =
  useEffect(() => {
    if (currentDropdownElement == null || currentGridParent == null) return;

    const alignedDropdownTop =
      currentDropdownElement.getBoundingClientRect().y +
      currentDropdownElement.offsetHeight;

      if ((alignedDropdownTop + Math.min((filteredMenuItems.length + (nullable?1:0)) * menuStyleHeight, maxNumberOfMenuItemsShown * menuStyleHeight) >
        currentGridParent.getBoundingClientRect().bottom
      ) || initialDirection === "up") {
        setDropdownTop(
          currentDropdownElement.getBoundingClientRect().y -
          Math.min((filteredMenuItems.length + (nullable?1:0) +(showTypeIn?1:0)) * menuStyleHeight ,
            maxNumberOfMenuItemsShown * menuStyleHeight)
        );
        setInitialDirection("up");
      } else {
        setDropdownTop(alignedDropdownTop)
      }
      setDropdownHeight( Math.min((filteredMenuItems.length + (nullable?1:0) +(showTypeIn?1:0) ) * menuStyleHeight, maxNumberOfMenuItemsShown * menuStyleHeight));
      setDropdownLeft(currentDropdownElement.getBoundingClientRect().x );
    }, [open,currentGridParent,currentDropdownElement,showTypeIn,filteredMenuItems]
  );


  const handleTextInputChange = (event) => {
//    if (!allowNewTypeIn) return;

    const myTypeIn = event.target.value;

    if (myTypeIn.trim() === "") {
      localTypeIn = "";
      setTypeIn("");
      setSelectedValue(null);
      setSelectedLabel("");
      setFilteredMenuItems(updatedMenuItems);
      setShowTypeIn(false);
    } else {
      prevLocalTypeIn = localTypeIn;
      localTypeIn = event.target.value;
      setTypeIn(event.target.value)
      let matchingThings = updatedMenuItems.filter(item => item.value.toLowerCase().indexOf(localTypeIn.toLowerCase()) > -1);
      if (matchingThings.length > 0 && !allowNewTypeIn)
        setFilteredMenuItems(matchingThings);
      else {
        setFilteredMenuItems(matchingThings);
        localTypeIn = prevLocalTypeIn;
      }
    }
  };

  useEffect( () => {
    const currentSelections = updatedMenuItems.filter(item => item.value === selectedValue );
    if (currentSelections.length > 0) {
      setSelectedLabel(currentSelections[0].label)
    } else if (selectedValue === null)
      setSelectedLabel("")
    else setSelectedLabel(initialValue)
    },[initialValue, updatedMenuItems, selectedValue]
  );

  /* Do i show the typeIn menu item option? */
  useEffect( () => {
    if (typeIn === null) return;
    if (
      typeIn.length > 0 &&
      // show only the case-insensitive matching item if there is one.
      filteredMenuItems.filter(item => item.value.toLowerCase() === typeIn.toLowerCase()).length === 0)
      setShowTypeIn(true)   // show the custom dropdown menu item with the typed-in value
    else
      setShowTypeIn(false)
    }
    ,[typeIn, filteredMenuItems]);

  const selectEditorRef = useRef(null);
  const selectEditorMenu = useRef(null);

  return (
    <ClickAwayListener onClickAway={()=> {
      closeDown();
    }
    }>
      <div>
        <div ref={selectEditorRef}
             className={"bx--select-editor"}
             disabled={disabled}>
          {((!open)) && // && allowNewTypeIn) || !allowNewTypeIn ) &&
          <div className={"bx--select-value" + (!allowNewTypeIn && open && "-focus"||"")}
               onClick={(evt) => handleOnClick(evt,updatedMenuItems)}>
            <div className={"bx--select-text"} id={id}>
              {typeIn !== null ? typeIn : selectedLabel  }
            </div>
          </div>
          }
          {open && // allowNewTypeIn &&
          <>
            <TextInput
              id={id}
              selected={true}
              disabled={false}
              autoFocus={true}
              value={typeIn||selectedLabel}
              onChange={handleTextInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="bx--select-editor-closer" onClick={closeDown}/>
          </>
          }
        </div>
        { open &&
          <Portal rootId={"select-editor-menulist"}>

            <div className={"bx--select-menu"}
                 onClick={handleOnClick}
                 ref={selectEditorMenu}
                 style={{top:dropdownTop+"px", left:dropdownLeft+"px"}}
            >
              <div className={"bx--select-menu-scroll"}
                style={{maxHeight:dropdownHeight + "px"}}>
                {nullable &&
                <div className={"bx--select-option"}
                     name={"_unselected"}
                     key={"_unselected"}
                     onClick={(event) => handleSelect(event, null)}
                />
                }
                { showTypeIn && allowNewTypeIn &&
                  <div className={"bx--select-option"}
                     name={typeIn}
                     key={"---typeIn---"}
                     value={typeIn}
                     onClick={(event) => handleSelect(event, typeIn)}
                  >{typeIn}
                  </div>
                }
                {filteredMenuItems && filteredMenuItems
                  .sort((a,b) => a.label.localeCompare (b.label))
                  .map(item =>
                  <div className={"bx--select-option"}
                       name={item.label}
                       key={item.value}
                       value={item.value}
                       onClick={(event) => handleSelect(event,  item.value)}
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

export default React.memo(ComboSelectEditor);

ComboSelectEditor.propTypes = {
  onCellBlur : PropTypes.func,
  onCellChange: PropTypes.func,
  selectLabel : PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), /* value in the value parameter of the option tag. */
//  menus: PropTypes.arrayOf( PropTypes.shape({
//    label: PropTypes.string,
//    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//  })),
  multiple: PropTypes.bool,
  nullable: PropTypes.bool,
  allowTypeIn: PropTypes.bool
}

ComboSelectEditor.defaultProps = {
  selectLabel : "",
  multiple: false,
  nullable: false,
  allowTypeIn: false
}
