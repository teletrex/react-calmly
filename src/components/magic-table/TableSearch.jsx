/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';

const TableSearch = ({}) => {

  return (
    <>
    <div tabIndex="-1" role="search" className="bx--toolbar-action bx--toolbar-search-container-persistent">
      <div className="bx--search bx--search--sm">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"
             className="bx--search-magnifier">
          <path
            d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"></path>
        </svg>
        <label htmlFor="1" className="bx--label">Filter table</label><input role="searchbox" autoComplete="off"
                                                                            tabIndex="0" aria-hidden="false" type="text"
                                                                            className="bx--search-input" id="1"
                                                                            placeholder="Search..." value="" />
        <button className="bx--search-close bx--search-close--hidden" type="button" aria-label="Clear search input">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
               fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
          </svg>
        </button>
      </div>
    </div>
    </>
  );
};

export default TableSearch;
