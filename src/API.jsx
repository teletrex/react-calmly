/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { Component } from 'react';

import '../src/styles.scss';



export const API = ({ propDefinitions }) => {
  const props = propDefinitions.map(
    ({ property, propType, required, description, defaultValue }) => {
        <tr key={property}>
          <td>
            {property}
            {required ? <Red>*</Red> : null}
          </td>
          <td>{propType.name}</td>
          <td>{defaultValue}</td>
          <td>{description}</td>
        </tr>
    });

  return (
    <table>
      <thead>
      <tr>
        <th>name</th>
        <th>type</th>
        <th>default</th>
        <th>description</th>
      </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
}

