/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

import GaugeChart from '.';

describe('Gauge Chart', () => {
  it('renders without errors', () => {
    const wrapper = mount(<GaugeChart passProp />);
    expect(wrapper.find(GaugeChart)).toHaveLength(1);
  });
  it('renders with formatted data', () => {
    const { getByText } = render(
      <GaugeChart dataFormatter={value => `${value}$`} passProp data={10} />
    );
    const formattedData = getByText('10$').textContent;
    expect(formattedData).toBe('10$');
  });
  it('renders empty state when data equals zero', () => {
    const { container } = render(<GaugeChart data={0} />);
    const emptyStateElement = container.querySelector('.bx--recharts-empty-state__wrapper');
    expect(emptyStateElement).toBeInTheDocument();
  });
});
