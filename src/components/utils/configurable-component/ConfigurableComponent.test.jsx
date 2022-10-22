/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import noop from 'lodash/noop';
import { render } from '@testing-library/react';

import { useCallOnce } from '../hooks';

import { ConfigurableComponent } from './ConfigurableComponent';

const TestComponent = ({
  onMount = noop,
  'aria-label': ariaLabel,
  children,
  defaultPropTest,
  forwardedDefaultprop,
}) => {
  useCallOnce(onMount);

  return (
    <div aria-label={ariaLabel}>
      test component content
      <div>{children}</div>
      <div>{defaultPropTest}</div>
      <div>{forwardedDefaultprop}</div>
    </div>
  );
};

TestComponent.defaultProps = {
  defaultPropTest: 'value coming from defaultProps',
};

// we don't care much about the ref here,
// but we need to check if rendering a forwarded component is the same
// as the original one
const FowardedTestComponent = React.forwardRef(function ForwardTestComponent(props, ref) {
  return <TestComponent forwardedRef={ref} {...props} />;
});

FowardedTestComponent.defaultProps = {
  forwardedDefaultprop: 'value coming from fowarded component defaultProps',
};

describe('ConfigurableComponent', () => {
  describe('component', () => {
    it('renders component by jsx', () => {
      const { getByText } = render(
        <ConfigurableComponent component={<TestComponent>children</TestComponent>} />
      );

      expect(getByText('test component content')).toBeInTheDocument();
      expect(getByText('value coming from defaultProps')).toBeInTheDocument();
      expect(getByText('children')).toBeInTheDocument();
    });

    it('does not forward props to component by jsx', () => {
      const { queryByLabelText } = render(
        <ConfigurableComponent
          aria-label="the label"
          component={<TestComponent>children</TestComponent>}
        />
      );

      expect(queryByLabelText('the label')).toBe(null);
    });

    it('renders component by type', () => {
      const { getByText } = render(<ConfigurableComponent component={TestComponent} />);

      expect(getByText('test component content')).toBeInTheDocument();
      expect(getByText('value coming from defaultProps')).toBeInTheDocument();
    });

    it('renders FowardedRef by type', () => {
      const { getByText } = render(<ConfigurableComponent component={FowardedTestComponent} />);

      expect(getByText('test component content')).toBeInTheDocument();
      expect(getByText('value coming from defaultProps')).toBeInTheDocument();
    });

    it('renders defaultProps defined in fowardedRef when rendering by type', () => {
      const { getByText } = render(<ConfigurableComponent component={FowardedTestComponent} />);

      expect(getByText('value coming from fowarded component defaultProps')).toBeInTheDocument();
    });

    it('forwards props to component by type', () => {
      const { getByLabelText } = render(
        <ConfigurableComponent aria-label="the label" component={TestComponent} />
      );

      expect(getByLabelText('the label')).toBeInTheDocument();
    });

    it('forwards children to component by type', () => {
      const { getByText } = render(
        <ConfigurableComponent component={TestComponent}>child node</ConfigurableComponent>
      );

      expect(getByText('child node')).toBeInTheDocument();
    });

    it('renders function', () => {
      const { getByText } = render(<ConfigurableComponent component={() => <TestComponent />} />);

      expect(getByText('test component content')).toBeInTheDocument();
    });

    it('forwards props to function', () => {
      const { getByLabelText } = render(
        <ConfigurableComponent
          aria-label="the label"
          component={props => <TestComponent {...props} />}
        />
      );

      expect(getByLabelText('the label')).toBeInTheDocument();
    });

    it('render by config object via component', () => {
      const { getByText, getByLabelText } = render(
        <ConfigurableComponent
          component={{
            component: TestComponent,
            componentProps: {
              'aria-label': 'label',
            },
          }}
        />
      );

      expect(getByText('test component content')).toBeInTheDocument();
      expect(getByText('value coming from defaultProps')).toBeInTheDocument();
      expect(getByLabelText('label')).toBeInTheDocument();
    });

    it('render by config object via render function', () => {
      const { getByText, getByLabelText } = render(
        <ConfigurableComponent
          component={{
            render: props => <TestComponent {...props} />,
            componentProps: {
              'aria-label': 'my label',
            },
          }}
        />
      );

      expect(getByText('test component content')).toBeInTheDocument();
      expect(getByLabelText('my label')).toBeInTheDocument();
    });

    it('componentProps have priority over props', () => {
      const { getByLabelText, queryByLabelText } = render(
        <ConfigurableComponent
          aria-label="will not show"
          component={{
            component: TestComponent,
            componentProps: {
              'aria-label': 'label',
            },
          }}
        />
      );

      expect(queryByLabelText('will not show')).toBeNull();
      expect(getByLabelText('label')).toBeInTheDocument();
    });

    it('render string', () => {
      const { getByText } = render(<ConfigurableComponent component="some string" />);

      expect(getByText('some string')).toBeInTheDocument();
    });
  });

  describe('render prop', () => {
    it('should render', () => {
      const { getByText } = render(<ConfigurableComponent render={() => <TestComponent />} />);

      expect(getByText('test component content')).toBeInTheDocument();
    });

    it('should not remount via render', () => {
      const onMount = jest.fn();
      const { rerender } = render(
        <ConfigurableComponent
          aria-label="label"
          render={() => <TestComponent onMount={onMount} />}
        />
      );

      rerender(
        <ConfigurableComponent
          aria-label="label-2"
          render={() => <TestComponent onMount={onMount} />}
        />
      );

      expect(onMount).toHaveBeenCalledTimes(1);
    });

    it('renders using render function if both render and component are present', () => {
      const { getByText, queryByText } = render(
        <ConfigurableComponent
          component={<TestComponent>Will not show</TestComponent>}
          render={() => <TestComponent>Only in function</TestComponent>}
        />
      );

      expect(queryByText('Will not show')).toBeNull();
      expect(getByText('Only in function')).toBeInTheDocument();
    });
  });

  it('should not remount via config render', () => {
    const onMount = jest.fn();
    const { rerender } = render(
      <ConfigurableComponent
        aria-label="label"
        component={{
          render: () => <TestComponent onMount={onMount} />,
        }}
      />
    );

    rerender(
      <ConfigurableComponent
        aria-label="label-other-value"
        component={{
          render: () => <TestComponent onMount={onMount} />,
        }}
      />
    );

    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
