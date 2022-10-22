/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import noop from 'lodash/noop';

import { CONJUNCTION_AND } from './constants';
import RulesBuilder from './RulesBuilder';
import RulesBuilderSkeleton from './RulesBuilder.Skeleton';

const initialRules = {
  conjunction: CONJUNCTION_AND.id,
  data: [
    {
      criteriaKey: 'AGE',
    },
    {
      criteriaKey: 'NAME',
    },
  ],
};

const criteriaDropdown = [
  {
    id: 'AGE',
    text: 'Age',
  },
  {
    id: 'NAME',
    text: 'Name',
  },
];
const criteriaConfig = {
  AGE: {
    type: 'number',
  },
  NAME: {
    type: 'string',
  },
};

describe('RulesBuilder', () => {
  let props;

  beforeEach(() => {
    props = {
      initialRules,
      onRulesChange: noop,
      criteriaConfig,
      criteriaDropdown,
    };
  });
  it('should render correctly', () => {
    const { container } = render(<RulesBuilder {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render isReadOnly correctly', () => {
    const { container } = render(<RulesBuilder {...props} isReadOnly />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should duplicate rule', async () => {
    const { getAllByTestId, getByText } = render(<RulesBuilder {...props} />);

    fireEvent.mouseOver(getAllByTestId('rule-container')[0]);
    fireEvent.click(getAllByTestId('overflow-menu')[0]);
    fireEvent.click(getByText('Duplicate'));

    expect(getAllByTestId('rule-container').length).toBe(3);
  });

  it('should delete rule', async () => {
    const { getAllByTestId, getAllByLabelText } = render(<RulesBuilder {...props} />);

    fireEvent.mouseOver(getAllByTestId('rule-container')[0]);
    fireEvent.click(getAllByLabelText('Delete rule')[0]);

    expect(getAllByTestId('rule-container').length).toBe(1);
  });

  it('should add rule', async () => {
    const props = {
      initialRules,
      onRulesChange: noop,
      criteriaConfig,
      criteriaDropdown,
    };

    const { getByText, getAllByTestId } = render(<RulesBuilder {...props} />);

    fireEvent.click(getByText('+'));

    expect(getAllByTestId('rule-container').length).toBe(3);
  });

  it('should group and ungroup', async () => {
    const { getAllByTestId, getAllByLabelText, queryByLabelText } = render(
      <RulesBuilder {...props} />
    );

    fireEvent.mouseOver(getAllByTestId('rule-container')[0]);
    fireEvent.click(getAllByLabelText('Create group')[0]);

    expect(queryByLabelText('Remove bracket')).toBeInTheDocument();

    fireEvent.click(queryByLabelText('Remove bracket'));

    expect(queryByLabelText('Remove bracket')).not.toBeInTheDocument();
  });

  it('should move down', async () => {
    const { container, getAllByTestId, getByText } = render(<RulesBuilder {...props} />);

    fireEvent.mouseOver(getAllByTestId('rule-container')[0]);
    fireEvent.click(getAllByTestId('overflow-menu')[0]);
    fireEvent.click(getByText('Move down'));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should move up', async () => {
    const { container, getAllByTestId, getByText } = render(<RulesBuilder {...props} />);

    fireEvent.mouseOver(getAllByTestId('rule-container')[1]);
    fireEvent.click(getAllByTestId('overflow-menu')[1]);
    fireEvent.click(getByText('Move up'));

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('RulesBuilder skeleton', () => {
  it('should render correctly', () => {
    const { container } = render(<RulesBuilderSkeleton />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
