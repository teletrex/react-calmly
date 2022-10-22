/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import LabeledData from '../labeled-data';


/* Pass in data as array of maps.
 * Each map has label, value, format.
 * Value can be a string, integer, component.
 * If a component is passed in for value, format is ignored.
 *
 * data = [ {"Label":"mylabel",value:1,format:"currency",currency:"USD} , ...]
 */


export const LabeledDataSet= (
  {
    data,
    ...props
  }
  ) => {
      return <>
        {data.map(datum =>
          <LabeledData key={datum.label} label={datum.label} data={datum.value}
            format={datum.format} currency={datum.currency} locale={datum.locale}/>
        )
        }
      </>
};

LabeledDataSet.propTypes = {

  data: PropTypes.arrayOf(
    PropTypes.object,
  ),
};
