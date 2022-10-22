/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RULE_TYPES } from '../../constants';
import { IS_OPERATORS, RANGE_OPERATORS, BLANK_OPERATORS } from '../constants/operators';
import { NUMBER_RULE_OPERATORS, STRING_RULE_OPERATORS, VALUES } from '../constants';

import RuleContainer from './RuleContainer';

import { CustomRule, StringRule, NumberRule } from '..';

describe('RulesContainer', () => {
  const defaultProps = {
    config: {
      operators: STRING_RULE_OPERATORS,
      type: RULE_TYPES.string,
      placeholder: {
        textInput: 'Text placeholder',
      },
    },
    onRuleChange: jest.fn(),
    ruleComponent: StringRule,
  };

  beforeEach(() => {
    beforeEach(() => jest.resetAllMocks());
  });

  it('should render correctly', () => {
    const { container } = render(<RuleContainer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should properly render a CustomRule with custom operators', () => {
    const props = {
      ...defaultProps,
      config: {
        operators: [{ label: 'test operator', value: 'TEST_OPERATOR', inputType: 'singleValue' }],
        type: RULE_TYPES.custom,
      },
      ruleComponent: CustomRule,
    };
    const { getByText, getByRole } = render(<RuleContainer {...props} />);

    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');

    userEvent.click(dropdownButton);

    expect(getByText('test operator')).toBeInTheDocument();
  });

  it('should properly render a CustomRule with default operators only', () => {
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.custom,
      },
      ruleComponent: CustomRule,
    };
    const { getByText, queryByText, getByRole } = render(<RuleContainer {...props} />);

    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');
    userEvent.click(dropdownButton);

    expect(getByText('has not')).toBeInTheDocument();
    expect(getByText('has')).toBeInTheDocument();
    expect(queryByText('is blank')).not.toBeInTheDocument();
  });

  it('should properly call onRuleChange after changing the operator', () => {
    const { getByRole, getByText } = render(<RuleContainer {...defaultProps} />);

    // expand the operator dropdown:
    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');
    userEvent.click(dropdownButton);

    // select a new operator:
    userEvent.click(getByText(STRING_RULE_OPERATORS[1].label));

    expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
      operator: STRING_RULE_OPERATORS[1].value,
    });
  });

  it('should properly handle blank values', () => {
    const { getByRole, getByText } = render(<RuleContainer {...defaultProps} />);

    // expand the operator dropdown:
    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');
    userEvent.click(dropdownButton);

    // select a new operator:
    userEvent.click(getByText(BLANK_OPERATORS[0].label));

    expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
      operator: BLANK_OPERATORS[0].value,
      value: VALUES.BLANK,
    });
  });

  it('should properly call onRuleChange after changing the value', () => {
    const props = {
      ...defaultProps,
      data: {
        operator: STRING_RULE_OPERATORS[0].value,
        value: 'Initial value',
      },
    };
    const { getByPlaceholderText } = render(<RuleContainer {...props} />);
    const textInput = getByPlaceholderText(defaultProps.config.placeholder.textInput);

    fireEvent.change(textInput, { target: { value: 'New value' } });
    fireEvent.blur(textInput);

    expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
      operator: props.data.operator,
      value: 'New value',
    });
  });

  it('should call onRuleChange with formatted after changing the number value in NumberRule', async () => {
    const props = {
      ...defaultProps,
      config: {
        operators: NUMBER_RULE_OPERATORS,
        type: RULE_TYPES.number,
      },
      data: {
        operator: IS_OPERATORS[0].value,
        value: 3,
      },
      ruleComponent: NumberRule,
    };
    const { getByPlaceholderText } = render(<RuleContainer {...props} />);
    const numberInput = getByPlaceholderText('Enter value');

    fireEvent.change(numberInput, { target: { value: '2' } });
    fireEvent.blur(numberInput);
    await waitFor(() =>
      expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
        operator: props.data.operator,
        value: 2,
      })
    );
  });

  it('should call onRuleChange with formatted value after changing the range value in NumberRule', async () => {
    const props = {
      ...defaultProps,
      config: {
        operators: NUMBER_RULE_OPERATORS,
        type: RULE_TYPES.number,
      },
      data: {
        operator: RANGE_OPERATORS[0].value,
        value: [3, 7],
      },
      ruleComponent: NumberRule,
    };
    const { getAllByPlaceholderText } = render(<RuleContainer {...props} />);
    const numberInputs = getAllByPlaceholderText('Enter value');

    fireEvent.change(numberInputs[0], { target: { value: '2' } });
    fireEvent.blur(numberInputs[0]);
    await waitFor(() =>
      expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
        operator: props.data.operator,
        value: [2, 7],
      })
    );

    fireEvent.change(numberInputs[1], { target: { value: '9' } });
    fireEvent.blur(numberInputs[1]);
    await waitFor(() =>
      expect(defaultProps.onRuleChange).toHaveBeenCalledWith({
        operator: props.data.operator,
        value: [2, 9],
      })
    );
  });

  it('should render TimeframeSelector if provided with timeframe data', () => {
    const props = {
      ...defaultProps,
      timeframe: {
        operator: 'WITHIN_THE_LAST',
        value: {
          value: 7,
          period: 'DAYS',
        },
      },
    };
    const { getByTestId } = render(<RuleContainer {...props} />);

    expect(getByTestId('timeframe-selector')).toBeInTheDocument();
  });

  it('should properly set TimeframeSelector visibility if timeframe is enabled', () => {
    const InputComponent = ({ setTimeframeVisibility }) => (
      <button onClick={() => setTimeframeVisibility(false)} type="button">
        Hide timeframe
      </button>
    );
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.custom,
        inputComponent: InputComponent,
      },
      ruleComponent: CustomRule,
      timeframe: {
        onChange: jest.fn(),
        data: {
          operator: 'WITHIN_THE_LAST',
          value: {
            value: 7,
            period: 'DAYS',
          },
        },
      },
    };
    const { getByTestId, getByText, queryByTestId } = render(<RuleContainer {...props} />);
    expect(getByTestId('timeframe-selector')).toBeInTheDocument();

    fireEvent.click(getByText('Hide timeframe'));
    expect(queryByTestId('timeframe-selector')).not.toBeInTheDocument();
  });

  it('should properly reset the timeframe value on visibility change', () => {
    const InputComponent = ({ setTimeframeVisibility }) => (
      <button onClick={() => setTimeframeVisibility(false)} type="button">
        Hide timeframe
      </button>
    );
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.custom,
        inputComponent: InputComponent,
        hasTimeframe: true,
      },
      ruleComponent: CustomRule,
      timeframe: {
        onChange: jest.fn(),
        data: {
          operator: 'WITHIN_THE_LAST',
          value: {
            value: 7,
            period: 'DAYS',
          },
        },
      },
    };
    const { getByDisplayValue, getByText } = render(<RuleContainer {...props} />);
    expect(getByDisplayValue('7')).toBeInTheDocument();

    fireEvent.click(getByText('Hide timeframe'));
    expect(props.timeframe.onChange).toHaveBeenCalledWith({});
  });

  it("should not reset the timeframe value if it's empty", () => {
    const InputComponent = ({ setTimeframeVisibility }) => (
      <button onClick={() => setTimeframeVisibility(false)} type="button">
        Hide timeframe
      </button>
    );
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.custom,
        inputComponent: InputComponent,
        hasTimeframe: true,
      },
      ruleComponent: CustomRule,
      timeframe: {
        onChange: jest.fn(),
        data: {},
      },
    };
    const { getByText } = render(<RuleContainer {...props} />);

    fireEvent.click(getByText('Hide timeframe'));
    expect(props.timeframe.onChange).not.toHaveBeenCalledWith();
  });

  it('should not allow to show the TimeframeSelector if timeframe is not enabled', () => {
    const InputComponent = ({ setTimeframeVisibility }) => (
      <button onClick={() => setTimeframeVisibility(true)} type="button">
        Show timeframe
      </button>
    );
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.custom,
        inputComponent: InputComponent,
      },
      ruleComponent: CustomRule,
    };
    const { getByText, queryByTestId } = render(<RuleContainer {...props} />);
    expect(queryByTestId('timeframe-selector')).not.toBeInTheDocument();

    fireEvent.click(getByText('Show timeframe'));
    expect(queryByTestId('timeframe-selector')).not.toBeInTheDocument();
  });

  it('should set the first operator if disableCriteriaReselect is switched on', () => {
    const props = {
      ...defaultProps,
      config: {
        operators: [],
        type: RULE_TYPES.string,
        disableCriteriaReselect: true,
      },
      ruleComponent: StringRule,
    };

    const { getAllByText, getByRole } = render(<RuleContainer {...props} />);

    const dropdown = getByRole('listbox');
    const dropdownButton = within(dropdown).getByRole('button');
    userEvent.click(dropdownButton);
    expect(getAllByText(STRING_RULE_OPERATORS[0].label)).toHaveLength(2);
  });
});
