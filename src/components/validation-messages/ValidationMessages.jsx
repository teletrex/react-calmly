/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import {ErrorFilled} from "@carbon/icons-react";

export const ValidationMessages = (
  {
    validationSuggestions
  }
  ) => {

  return (
    validationSuggestions && validationSuggestions.length > 0 &&
    <div className={"eleven-validation-messages"}>
      <div>{validationSuggestions.map(suggestion => <div>{suggestion}</div>)}</div><ErrorFilled size={16} /></div>

  );
};


ValidationMessages.propTypes = {
  validationSuggestions: PropTypes.arrayOf(PropTypes.string)
}
