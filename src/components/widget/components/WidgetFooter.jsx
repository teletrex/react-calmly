/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React, {useState, useEffect} from 'react';

import { WidgetHeaderDefaultProps, WidgetHeaderPropTypes } from './prop-types';
import ConfigurableAction from '../../configurable-action';
import { widgetClassBuilder } from '../utils';
import FlexBox from "../../../containers/FlexBox";


const footerClassName = widgetClassBuilder('__footer');
const footerHeightClassName = widgetClassBuilder('__footerheight');

const WidgetFooter = props => {
  const {
    leftActions,
    rightActions,
    centerActions,
    children,
  } = props;


  const [hasContent, setHasContent] = useState(leftActions || rightActions || centerActions);

  useEffect(() => {
    if (leftActions || rightActions || centerActions) {
      setHasContent(true)
    } else {
      setHasContent(false)
    }
  },[leftActions,rightActions,centerActions]);


  return (
    <>
      {(hasContent || children) &&
      <div className={footerClassName}>
        {hasContent && (
          <FlexBox
            className={footerHeightClassName}
            key={"left"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            columnGap={0}
          >

            {leftActions &&
            // explicitly not destructing here, we want full action to be passed down
            leftActions.map(action => (
              <ConfigurableAction key={action.key} actionKey={action.key} {...action} size="small"/>
            ))}
          </FlexBox>
        )}
        {hasContent && (
          <FlexBox
            key={"center"}
            className={footerHeightClassName}
            flexDirection={"row"}
            justifyContent={"center"}
            columnGap={0}
          >
            {centerActions &&
            // explicitly not destructing here, we want full action to be passed down
            centerActions.map(action => (
              <ConfigurableAction key={action.key} actionKey={action.key} {...action} size="small"/>
            ))}
          </FlexBox>
        )}

          <FlexBox
            key={"right"}
            className={footerHeightClassName}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            columnGap={0}
          >
            {rightActions &&
            // explicitly not destructing here, we want full action to be passed down
            rightActions.map(action => (
              <ConfigurableAction key={action.key} actionKey={action.key} {...action} size="small"/>
            ))}
          </FlexBox>

      </div>
      }
    </>
  );
};

WidgetFooter.propTypes = WidgetHeaderPropTypes;
WidgetFooter.defaultProps = WidgetHeaderDefaultProps;

export default WidgetFooter;
