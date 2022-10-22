/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import commaNumber from 'comma-number';
import { render } from '@testing-library/react';

import CustomTooltip, {
  applyTransform,
  calculatePosition,
  processCursorPosition,
  translateUsingTip,
  withNativeClientPos,
  withOffset,
} from './CustomTooltip';

const customTooltipSelector = 'custom-tooltip';
const labelSelector = prefix => `${prefix}-label`;
const valueSelector = prefix => `${prefix}-value`;
const exactValueOf = value => new RegExp(`^${value}$`);

const entry = {
  dataKey: 'DATA_KEY',
  name: 'VALUE',
  value: 9400,
};
const defaultTooltipProps = {
  active: true,
  activeDataKey: '',
  payload: [entry],
  label: 'SALES',
};

describe('CustomTooltip', () => {
  const { dataKey, name, value: entryValue } = entry;
  const formattedValue = commaNumber(entryValue);

  test('should render custom tooltip with default formatters', () => {
    const { getByTestId } = render(<CustomTooltip {...defaultTooltipProps} />);
    const tooltip = getByTestId(customTooltipSelector);
    const label = getByTestId(labelSelector(customTooltipSelector));
    const value = getByTestId(valueSelector(customTooltipSelector));

    expect(tooltip).toBeInTheDocument();
    expect(label).toHaveTextContent(exactValueOf(name));
    expect(value).toHaveTextContent(exactValueOf(formattedValue));
  });

  test('should render data key custom tooltip for given active data key', () => {
    const { getByTestId } = render(
      <CustomTooltip {...defaultTooltipProps} activeDataKey={dataKey} />
    );
    const tooltip = getByTestId(customTooltipSelector);
    const label = getByTestId(labelSelector(customTooltipSelector));
    const value = getByTestId(valueSelector(customTooltipSelector));

    expect(tooltip).toBeInTheDocument();
    expect(label).toHaveTextContent(exactValueOf(name));
    expect(value).toHaveTextContent(exactValueOf(`${defaultTooltipProps.label} ${formattedValue}`));
  });

  test('should not render tooltip when it is not active', () => {
    const { queryByTestId } = render(<CustomTooltip {...defaultTooltipProps} active={false} />);
    const customTooltip = queryByTestId(customTooltipSelector);

    expect(customTooltip).toBeNull();
  });

  test('should format tooltip value using custom value formatter', () => {
    const valueFormatterProps = {
      ...defaultTooltipProps,
      formatter: value => `${commaNumber(value)}%`,
    };

    const { getByTestId } = render(<CustomTooltip {...valueFormatterProps} />);
    const tooltip = getByTestId(customTooltipSelector);
    const label = getByTestId(labelSelector(customTooltipSelector));
    const value = getByTestId(valueSelector(customTooltipSelector));

    expect(tooltip).toBeInTheDocument();
    expect(label).toHaveTextContent(exactValueOf(name));
    expect(value).toHaveTextContent(exactValueOf(`${formattedValue}%`));
  });

  test('should format tooltip label using custom label formatter', () => {
    const labelFormatterProps = {
      ...defaultTooltipProps,
      labelFormatter: label => `DATA: ${label}`,
    };

    const { getByTestId } = render(<CustomTooltip {...labelFormatterProps} />);
    const tooltip = getByTestId(customTooltipSelector);
    const label = getByTestId(labelSelector(customTooltipSelector));
    const value = getByTestId(valueSelector(customTooltipSelector));

    expect(tooltip).toBeInTheDocument();
    expect(label).toHaveTextContent(exactValueOf(`DATA: ${name}`));
    expect(value).toHaveTextContent(exactValueOf(formattedValue));
  });

  describe('utils', () => {
    test('withNativeClientPos: should extract clientX/clientY correct', () => {
      const eventMock = {
        nativeEvent: {
          clientX: 5,
          clientY: 8,
        },
      };

      expect(withNativeClientPos(eventMock)).toMatchObject({ left: 5, top: 8 });
    });

    test('applyTransform: should apply style transform according to given position', () => {
      expect(() => {
        applyTransform({ position: { badPayload: 'unsafe' } });
      }).not.toThrow(Error);

      const tooltip = {
        style: {},
      };

      applyTransform({ tooltip, position: { left: 10, top: 15 } });

      expect(tooltip).toMatchObject({
        style: { transform: 'translate(10px, 15px)' },
      });
    });

    test('withOffset: should adjust given offset', () => {
      expect(() => {
        withOffset();
      }).not.toThrow(Error);

      expect(
        withOffset({ left: 10, top: 15 })({ position: { left: 100, top: 100 } })
      ).toMatchObject({ position: { left: 110, top: 115 } });
    });

    test('translateUsingTip: should translate given "top"/"left" position by given multiplier', () => {
      expect(() => {
        translateUsingTip()({ pos: { badPayload: 'unsafe' } });
      }).not.toThrow(Error);

      const tooltip = {
        getBoundingClientRect: () => ({ width: 80, height: 40 }),
      };

      expect(
        translateUsingTip({ width: { multiplier: 0.5 }, height: { multiplier: 0.5 } })({
          tooltip,
          position: { left: 100, top: 100 },
        })
      ).toMatchObject({
        position: { left: 140, top: 120 },
      });
    });

    test('calculatePosition: should translate given position using chart bounds', () => {
      expect(() => {
        calculatePosition({ pos: { badPayload: 'unsafe' } });
      }).not.toThrow(Error);

      const chart = {
        getBoundingClientRect: () => ({ left: 100, top: 150 }),
      };

      expect(calculatePosition({ chart, position: { left: 200, top: 300 } })).toMatchObject({
        position: { left: 100, top: 150 },
      });
    });

    test('processCursorPosition: should process position via given params safe', () => {
      expect(() => {
        processCursorPosition()()();
      }).not.toThrow(Error);

      const myAdjustFn = jest.fn();

      processCursorPosition(myAdjustFn)({}, {})({ left: 115, top: 140 });
      expect(myAdjustFn).toHaveBeenCalledTimes(1);
    });

    test('processCursorPosition: should process position via given params as functions safe', () => {
      const myAdjustFn = jest.fn();

      processCursorPosition(myAdjustFn)(
        () => {},
        () => {}
      )();
      expect(myAdjustFn).toHaveBeenCalledTimes(1);
    });
  });
});
