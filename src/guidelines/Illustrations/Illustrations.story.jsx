/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import  settings from '../../settings';

import * as SvgComponents from '../../components/svg-components';
// this kind of import is only allowed because this is a story.
// and this styling is for exclusive use of the story.
//import './_illustrations.scss';

const { prefix } = settings;

/**
 * this component is used only to show a border and
 * the component nade inside the story. To use in applications,
 * directly import the svg like:
 * import { EmptyState403ErrorSvg } from '@carbon/react';
 *
 * and then use like this:
 * <EmptyState403ErrorSvg/>
 */
const SVGWrapper = ({ Svg, componentName }) => {
  return (
    <div className={`${prefix}--illustration`}>
      <h4>{`<${componentName}/>`}</h4>
      <div className={`${prefix}--illustration__wrapper`}>
        <Svg />
      </div>
    </div>
  );
};

storiesOf('Guidelines/Illustrations', module).add('default', () => {
  const whiteBG = boolean('White background', false);
  const duplicate = boolean('Duplicate illustrations (to check for id duplicates)', false);
  return (
    <main>
      <div
        className={`${prefix}--illustrations`}
        style={{
          backgroundColor: whiteBG ? '#fff' : 'transparent',
        }}
      >
        {Object.keys(SvgComponents).map((componentName, index) => {
          return (
            <React.Fragment key={index}>
              <SVGWrapper componentName={componentName} Svg={SvgComponents[componentName]} />
              {duplicate && (
                <SVGWrapper componentName={componentName} Svg={SvgComponents[componentName]} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
});
