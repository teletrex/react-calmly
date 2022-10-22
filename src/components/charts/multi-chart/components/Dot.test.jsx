/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render } from '@testing-library/react';

import { ActiveLineDotWithAlert, ActiveDashedDotWithAlert, InactiveDot } from './Dot';

jest.mock('recharts', () => ({
  Dot: 'span',
}));

const payload = {
  x: '2019-06-23',
  yLine: 27,
  yDashed: 24,
  bounds: [16, 37],
};

const alertPayload = {
  x: '2019-06-24',
  yLine: 7,
  yLineIsAlert: true,
  yDashed: 25,
  bounds: [17, 40],
};

const dotProps = {
  cx: 17,
  cy: 23,
  index: 0,
};

describe('MultiChart Dot', () => {
  it('renders ActiveLineDotWithAlert', () => {
    const { container } = render(<ActiveLineDotWithAlert payload={payload} {...dotProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders ActiveLineDotWithAlert with alert', () => {
    const { container } = render(<ActiveLineDotWithAlert payload={alertPayload} {...dotProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders ActiveDashedDotWithAlert', () => {
    const { container } = render(<ActiveDashedDotWithAlert payload={payload} {...dotProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders ActiveDashedDotWithAlert with alert', () => {
    const { container } = render(<ActiveDashedDotWithAlert payload={alertPayload} {...dotProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('InactiveDot renders null if has no alert', () => {
    const { container } = render(<InactiveDot payload={payload} {...dotProps} />);

    expect(container.firstChild).toEqual(null);
  });

  it('renders InactiveDot', () => {
    const { container } = render(<InactiveDot payload={alertPayload} {...dotProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders selected InactiveDot', () => {
    const { container } = render(
      <InactiveDot payload={alertPayload} {...dotProps} activeLinePointIndex={0} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
