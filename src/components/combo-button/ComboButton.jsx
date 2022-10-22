/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import {Button, OverflowMenu, OverflowMenuItem} from "@carbon/react";
import {Add, CaretDown} from "@carbon/icons-react";
import settings from '../../settings';

const {prefix} = settings;
const ComboButton = (
  {
    onClick,
    renderIcon,
    kind,
    flipped,
    children,
    caption
  }
  ) => {

  return (
    <div className={`${prefix}--combo-button`}>
      <Button
        kind={kind || "ghost"}
        size={"sm"}
        renderIcon={() => renderIcon || <Add size={16} /> }
        onClick={onClick}>
       {caption || ''}
      </Button>
      <OverflowMenu
        kind={kind | "ghost"}
        size={"sm"}
        renderIcon= {()=> <CaretDown size={16} />}
        flipped={flipped}
        caption={''}
      >
        {children}
      </OverflowMenu>
    </div>
  );
};

export default ComboButton;

ComboButton.propTypes = {
  onClick: PropTypes.func,
  kind: PropTypes.string, //primary, secondary, tertiary, ghost, inverted-tertiary
  renderIcon: PropTypes.object,
}
