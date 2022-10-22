/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import moment from 'moment-timezone';

import { useFormat } from '../useFormat';

import FormatDate from './FormatDate';
import { DATE_FORMAT } from './presets';

const dateStr = 'Tue Apr 07 2020 07:45:55 GMT-0500';
const dateInstance = new Date(dateStr);
const dateISOStr = dateInstance.toISOString();
const dateTimeStamp = dateInstance.getTime();
const invalidDate = new Date('abc');

const props = preset => ({
  value: text('Custom value to be formatted', dateStr),
  preset,
});

const renderFormattersBlock = preset => {
  return (
    <div>
      <p>
        Value is Date: <FormatDate preset={preset} value={dateInstance} />
      </p>
      <p>
        Value is string: <FormatDate preset={preset} value={dateStr} />
      </p>
      <p>
        Value is ISO string: <FormatDate preset={preset} value={dateISOStr} />
      </p>
      <p>
        Value is number: <FormatDate preset={preset} value={dateTimeStamp} />
      </p>
      <p>
        Custom date str: <FormatDate {...props(preset)} />
      </p>
    </div>
  );
};

const HooksDemo = () => {
  const { formatDate } = useFormat();
  return (
    <div>
      <p>DATE_FORMAT.DATE: {formatDate(dateInstance, DATE_FORMAT.DATE)}</p>
      <p>DATE_FORMAT.DATE_TIME: {formatDate(dateInstance, DATE_FORMAT.DATE_TIME)}</p>
      <p>
        DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY:{' '}
        {formatDate(dateInstance, DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY)}
      </p>
      <p>DATE_FORMAT.TIME: {formatDate(dateInstance, DATE_FORMAT.TIME)}</p>
      <p>DATE_FORMAT.TIME_AGO: {formatDate(dateInstance, DATE_FORMAT.TIME_AGO)}</p>
    </div>
  );
};

storiesOf('Localization/FormatDate', module)
  .add('Preset DATE', () => renderFormattersBlock(DATE_FORMAT.DATE), {
    info: {
      text: `FormatDate with preset DATE`,
    },
  })
  .add('Preset DATE_TIME', () => renderFormattersBlock(DATE_FORMAT.DATE_TIME), {
    info: {
      text: `FormatDate with preset DATE_TIME`,
    },
  })
  .add(
    'Preset DATE_TIME_WITH_WEEK_DAY',
    () => renderFormattersBlock(DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY),
    {
      info: {
        text: `FormatDate with preset DATE_TIME_WITH_WEEK_DAY`,
      },
    }
  )
  .add('Preset SHORT_DATE', () => renderFormattersBlock(DATE_FORMAT.SHORT_DATE), {
    info: {
      text: `FormatDate with preset SHORT_DATE`,
    },
  })
  .add('Preset TIME', () => renderFormattersBlock(DATE_FORMAT.TIME), {
    info: {
      text: `FormatDate with preset TIME`,
    },
  })
  .add('Preset TIME_WITH_SECONDS', () => renderFormattersBlock(DATE_FORMAT.TIME_WITH_SECONDS), {
    info: {
      text: `FormatDate with preset TIME_WITH_SECONDS`,
    },
  })
  .add(
    'Preset TIME_AGO',
    () => (
      <>
        {renderFormattersBlock(DATE_FORMAT.TIME_AGO)}
        <hr />
        <p>
          An minute ago:{' '}
          <FormatDate preset={DATE_FORMAT.TIME_AGO} value={moment().subtract(1, 'minutes')} />
        </p>
        <p>
          An 10 minutes ago:{' '}
          <FormatDate preset={DATE_FORMAT.TIME_AGO} value={moment().subtract(10, 'minutes')} />
        </p>
        <p>
          An hour ago:{' '}
          <FormatDate preset={DATE_FORMAT.TIME_AGO} value={moment().subtract(1, 'hours')} />
        </p>
        <p>
          A day ago:{' '}
          <FormatDate preset={DATE_FORMAT.TIME_AGO} value={moment().subtract(1, 'days')} />
        </p>
        <p>
          An week ago:{' '}
          <FormatDate preset={DATE_FORMAT.TIME_AGO} value={moment().subtract(7, 'days')} />
        </p>
      </>
    ),
    {
      info: {
        text: `FormatDate with preset TIME_AGO`,
      },
    }
  )
  .add('formatDate from useFormat', () => <HooksDemo />, {
    info: {
      text: `Using formatDate from useFormat`,
    },
  })
  .add(
    'Invalid values',
    () => (
      <>
        <p>
          Value is null: <FormatDate preset={DATE_FORMAT.DATE} value={null} />
        </p>
        <p>
          Value is undefined: <FormatDate preset={DATE_FORMAT.DATE} value={undefined} />
        </p>
        <p>
          Value is a wrong ISO string:{' '}
          <FormatDate preset={DATE_FORMAT.DATE} value="2020-Mar-25T110:37:42.388Z" />
        </p>
        <p>
          Value is NaN: <FormatDate preset={DATE_FORMAT.DATE} value={NaN} />
        </p>
        <p>
          Value is an Invalid Date: <FormatDate preset={DATE_FORMAT.DATE} value={invalidDate} />
        </p>
      </>
    ),
    {
      info: {
        text: `FormatDate with invalid values`,
      },
    }
  );
