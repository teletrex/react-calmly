/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';

const bodyShort02 = {
  fontSize: '1rem',
  lineHeight: '1.375rem',
  fontWeight: '400',
  letterSpacing: '0px',
  marginBottom: '1rem',
};

storiesOf('Components/PowerBI', module).add('PowerBI Widget', () => (
  <div>
    <div  style={{padding:"10px"}}>
    <p style={bodyShort02}>
        The following is an example of PowerBI embedded via iframe into this React component. Experimental. WIP. <a href={"https://app.powerbi.com/reportEmbed?reportId=report-id-goes-here&autoAuth=false&ctid=ctid-goes-here&config=config-goes-here"}>Full Page View</a>
      </p>
    </div>
    <iframe title="APONYCTAXITUTORIAL - Page 1" width="100%" height="541.25"
            src="https://app.powerbi.com/reportEmbed?reportId=report-id-goes-here&autoAuth=false&ctid=ct-id-goes-here&config=config-goes-here"
              frameBorder="0" allowFullScreen="true"></iframe>
  </div>
      )).add('PowerBI Dashboard', () => (
  <div>
    <div  style={{padding:"10px"}}>
      <p style={bodyShort02}>
        The following is an example of PowerBI dashboard embedded. <a href={"https://app.powerbi.com/reportEmbed?reportId=report-id-goes-here&autoAuth=true&ctid=ctid-goes-here&config=config-goes-here"}>Full Page View</a>
      </p>
    </div>
    <iframe title="My Report - Page 1" width="100%" height="541.25"
            src="https://app.powerbi.com/reportEmbed?reportId=report-id-goes-here&autoAuth=false&ctid=ct-id-goes-here&config=config-goes-here"
              frameBorder="0" allowFullScreen="true"></iframe>
  </div>
));
