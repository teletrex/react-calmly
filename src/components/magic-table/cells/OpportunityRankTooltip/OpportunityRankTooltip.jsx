/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React  from 'react';

export const OpportunityRankTooltip = props => {
  const {
    value,
    ...other
  } = props;
  return (
    <>

      <div>{Math.floor(value*1000)/10 +"%"}</div>

      {/*
      <div>&nbsp;</div>
      <div>      { t('opportunitytooltip.text')}</div>
      <div>
        <table style={{ margin: "0 auto"}}>
          <tr>
            <td colspan={5}>&nbsp;
            </td>
          </tr>
          <tr>
            <td align={"right"}>{ t('opportunitytooltip.least')}</td>
            <td>&nbsp;</td>
            <td width={"110px"}><PercentileIndicator value={0.74} /></td>
            <td>&nbsp;</td>
            <td>{ t('opportunitytooltip.most')}</td>
          </tr>
          <tr>
            <td colspan={5} align={"center"}>{ t('opportunitytooltip.effectiveness')}</td>
          </tr>
        </table>
      </div>
*/}
</>
  )
}





