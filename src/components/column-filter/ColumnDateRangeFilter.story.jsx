/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import ColumnDateRangeFilter from "./ColumnDateRangeFilter";
import {useTranslation} from '../../translation';

const defaultProps = () => ({
  onApply: action('Apply'),
  onReset: action('Reset'),
  title: text('Title', null),
  subtitle: text('Subtitle', null),
  valueFieldPlaceholder:  text('Value field placeholder', 'Value'),
  overflowMenuProps: {
    flipped: boolean('Flip menu position', false),
  }
});

export const generateOptions = (number = 10) =>
  Array.from({ length: number }).map((_, index) => ({
    text: `Option ${index + 1}`,
    checked: false,
    value: index,
  }));

storiesOf('Components/Column Date Range Filter', module)
  .addDecorator(withKnobs)
  .add('default', () =>
  {
    const {t} = useTranslation();
    debugger;
    return <ColumnDateRangeFilter {...defaultProps()}  t={t} dateFormat={"M d, Y"}/>
  })
  .add('with starting options', () => {
      const {t} = useTranslation();
      return <ColumnDateRangeFilter {...defaultProps()}
                                    options={[{comparator:{text:t("column.range.filter.equals",'Equals'),id:"="}, value:"08-20-2021"}]}
                                    t={t}
                                    dateFormat={"M d, Y"}
      />
    }
  );
