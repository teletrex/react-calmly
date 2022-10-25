/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { mount, shallow } from 'enzyme';
import { Notification } from '@carbon/icons-react';
import  settings  from '../../settings';

import Button from '@carbon/react';

import Badge from './Badge';
import InsightsFlag from './InsightsFlag';
import GeneralFlag from './GeneralFlag';
import NotificationFlag from './NotificationFlag';
import NumberNotificationFlag from './NumberNotificationFlag';
import { STATUS_ICON_POSITION } from './constants';

const { prefix } = settings;

const props = {
  published: {
    status: 'published',
    size: 's',
    showLabel: true,
  },
  approved: {
    status: 'approved',
    size: 'xs',
    showLabel: true,
  },
  pending: {
    status: 'pending',
    size: 's',
    showLabel: true,
  },
  success: {
    status: 'success',
    size: 's',
    showLabel: true,
  },
  cancelled: {
    status: 'cancelled',
    size: 's',
    showLabel: true,
  },
  failed: {
    status: 'failed',
    size: 's',
    showLabel: true,
  },
  scheduled: {
    status: 'scheduled',
    size: 'm',
    showLabel: true,
  },
  inprogress: {
    status: 'inprogress / Sending',
    size: 'm',
    showLabel: true,
  },
  draft: {
    status: 'draft / Open',
    size: 'm',
    showLabel: true,
  },
  complete: {
    status: 'complete',
    size: 'm',
    showLabel: true,
  },
  routine: {
    status: 'routine',
    size: 'l',
    showLabel: true,
  },
  event: {
    status: 'event',
    size: 'l',
    showLabel: true,
  },
  text: {
    notificationColor: '#49f9b9',
    showButton: true,
  },
  numberNotification: {
    numberOfNotifications: 3,
    showButton: true,
  },
  insights: {
    showButton: true,
  },
  color: {
    color: '#49f9b9',
  },
};

describe('Status', () => {
  test('should create Status', () => {
    const wrapper = mount(<Badge {...props.published} />);
    expect(wrapper.find(Badge)).toHaveLength(1);
  });
  test('should display green status for Published', () => {
    const wrapper = mount(<Badge {...props.published} />);
    expect(
      wrapper
        .find(`.${prefix}--status__stext`)
        .text()
        .includes('Published')
    ).toBe(true);
  });
  test('should display only text without icon', () => {
    const wrapper = mount(<Badge {...props.published} textOnly />);

    expect(wrapper.find('svg')).toHaveLength(0);
  });
  test('should display approved status with XS size', () => {
    const wrapper = mount(<Badge {...props.approved} />);
    expect(
      wrapper
        .find(`.${prefix}--status__xstext`)
        .text()
        .includes('Approved')
    ).toBe(true);
  });
  test('should display pending status', () => {
    const wrapper = mount(<Badge {...props.pending} />);
    expect(
      wrapper
        .find(`.${prefix}--status__stext`)
        .text()
        .includes('Pending')
    ).toBe(true);
  });
  test('should display failed status', () => {
    const wrapper = mount(<Badge {...props.failed} />);
    expect(
      wrapper
        .find(`.${prefix}--status__stext`)
        .text()
        .includes('Failed')
    ).toBe(true);
  });
  test('should display draft status with M size', () => {
    const wrapper = mount(<Badge {...props.draft} />);
    expect(
      wrapper
        .find(`.${prefix}--status__mtext`)
        .text()
        .includes('Draft')
    ).toBe(true);
  });
  test('should display success status', () => {
    const wrapper = mount(<Badge {...props.success} />);
    expect(
      wrapper
        .find(`.${prefix}--status__stext`)
        .text()
        .includes('Success')
    ).toBe(true);
  });
  test('should display cancelled status', () => {
    const wrapper = mount(<Badge {...props.cancelled} />);
    expect(
      wrapper
        .find(`.${prefix}--status__stext`)
        .text()
        .includes('Cancelled')
    ).toBe(true);
  });
  test('should display scheduled status with M size', () => {
    const wrapper = mount(<Badge {...props.scheduled} />);
    expect(
      wrapper
        .find(`.${prefix}--status__mtext`)
        .text()
        .includes('Scheduled')
    ).toBe(true);
  });
  test('should display inprogress status with M size', () => {
    const wrapper = mount(<Badge {...props.inprogress} />);
    expect(
      wrapper
        .find(`.${prefix}--status__mtext`)
        .text()
        .includes('Inprogress')
    ).toBe(true);
  });
  test('should display complete status with M size', () => {
    const wrapper = mount(<Badge {...props.complete} />);
    expect(
      wrapper
        .find(`.${prefix}--status__mtext`)
        .text()
        .includes('Complete')
    ).toBe(true);
  });
  test('should display routine status with L size', () => {
    const wrapper = mount(<Badge {...props.routine} />);
    expect(
      wrapper
        .find(`.${prefix}--status__ltext`)
        .text()
        .includes('Routine')
    ).toBe(true);
  });
  test('should display event status with L size', () => {
    const wrapper = mount(<Badge {...props.event} />);
    expect(
      wrapper
        .find(`.${prefix}--status__ltext`)
        .text()
        .includes('Event')
    ).toBe(true);
  });
  test('should display notification component', () => {
    const wrapper = shallow(
      <NotificationFlag {...props.text}>
        <Button
          hasIconOnly
          iconDescription="Button icon"
          renderIcon={() => <Notification size={16} /> }
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </NotificationFlag>
    );
    expect(wrapper.find(`.${prefix}--flag--notification--icon`)).toHaveLength(1);
    expect(wrapper.hasClass(`${prefix}--flag`)).toEqual(true);
  });
  test('should be possible to not display notification icon component', () => {
    const wrapper = shallow(
      <NotificationFlag {...props.text} notificationColor="transparent">
        <Button
          hasIconOnly
          iconDescription="Button icon"
          renderIcon={() => <Notification size={16} /> }
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </NotificationFlag>
    );
    expect(wrapper.find(`.${prefix}--flag--notification--icon`)).toHaveLength(0);
  });

  test('should display notification component with number', () => {
    const wrapper = shallow(
      <NumberNotificationFlag {...props.numberNotification}>
        <Button
          hasIconOnly
          iconDescription="Button icon"
          renderIcon={() => <Notification size={16} /> }
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </NumberNotificationFlag>
    );
    expect(wrapper.hasClass(`${prefix}--flag`)).toEqual(true);
  });
  test('should display insight component', () => {
    const wrapper = shallow(
      <InsightsFlag {...props.insights}>
        <Button
          hasIconOnly
          iconDescription="Button icon"
          renderIcon={() => <Notification size={16} /> }
          tooltipAlignment="center"
          tooltipPosition="bottom"
        />
      </InsightsFlag>
    );

    expect(wrapper.find(`.${prefix}--insightflag--notification`)).toHaveLength(1);
  });
  test('should display general component', () => {
    const wrapper = shallow(<GeneralFlag {...props.color}>Label</GeneralFlag>);
    expect(wrapper.hasClass(`${prefix}--generalflag`)).toEqual(true);
  });
  test('should display status icon after label', () => {
    const wrapper = mount(
      <Badge status="published" statusIconPosition={STATUS_ICON_POSITION.RIGHT} />
    );

    const lastChild = wrapper.find(`.${prefix}--status`).last();
    expect(lastChild.find('svg')).toHaveLength(1);
  });
});
