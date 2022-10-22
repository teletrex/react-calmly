/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import  settings  from '../../settings';

const { prefix } = settings;

export const CheckBoxListGroup = ({ onChangeSelection, options }) => {
    const onClick = clickedValue => {
        let newOptions = options.map(option => {
            if (option.value === clickedValue) {
                return { ...option, checked: !option.checked };
            }
            return option;
        });
        onChangeSelection(newOptions);
    }
    const dropDownItems = [];

    const ungroupedItems = [];
    const groupedItems = {};
    options.forEach(option => {
        if (option.group) {
            groupedItems[option.group] ? groupedItems[option.group].push(option) : groupedItems[option.group] = [option]
        } else {
            ungroupedItems.push(option);
        }
    })

    for (const group in groupedItems) {
        let items = groupedItems[group];
        dropDownItems.push(<CheckBoxGroup key={group} groupName={group} items={items} onClickItem={onClick} />)
    }


    return (
        <span className={`${prefix}--data-table-filters-window__checkbox-list-group`}>
            <CheckBoxGroup items={ungroupedItems} onClickItem={onClick} />
            {dropDownItems}
        </span>
    )
}

const CheckBoxGroupItem = ({ i, item, onClick }) => {
    return (
        <div className={`${prefix}--data-table-filters-window__checkbox-list-item`}>
            <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
                <input type="checkbox" className={`${prefix}--checkbox`} id={`${prefix}--checkbox-list-${item.group || 0}-${i}`} />
                <label className={`${prefix}--checkbox-label`} htmlFor={`${prefix}--checkbox-list-${item.group || 0}-${i}`} title={item.text} onClick={() => onClick(item.value)}>
                    <span className={`${prefix}--checkbox-label-text`} >{item.text}</span>
                </label>
            </div>
        </div>
    )
}

const CheckBoxGroup = ({ groupName, items, onClickItem }) => {
    let optionGroup = [];
    items.forEach((item, i) => {
        !item.invisible && optionGroup.push(<CheckBoxGroupItem key={i} i={i} item={item} onClick={onClickItem} />)
    });

    if (optionGroup.length === 0)
        return null;

    return (
        <div className={`${prefix}--checkbox-list-group`}>
            {groupName &&
                <div className={`${prefix}--data-table-filters-window__checkbox-list-item-title`}>
                    <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
                        <span className={`${prefix}--checkbox-label-text ${prefix}--checkbox-group-label-text`} >{groupName}</span>
                    </div>
                </div>}
            {optionGroup}
        </div>
    )
}
