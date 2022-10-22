/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



const lt = () => {

  const label = 'Format';
  const options = {
    number: 'number',
    string: 'string',
    tight: 'tight',
    none: null,
  };
  const defaultValue = null;
  const groupId = 'GROUP-ID2';

  const value = select(label, options, defaultValue, groupId);
  return (
    <LabeledData
      id={2}
      label={text('Label(label)', "Price")}
      data={text("Data(data)", "$4.00")}
      format={text("Format(format) 'string' 'number' 'tight'", null)}
    />
  )
}




