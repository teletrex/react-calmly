/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Filter } from '@carbon/icons-react';
import settings from '../../settings';

import { EmptyState401ErrorSvg } from '../svg-components';
import {OverflowMenu} from '@carbon/react';

import { Widget, WidgetContent } from './index';

const { prefix } = settings;
const CustomImageComponent = () => <EmptyState401ErrorSvg aria-label="custom image component" />;

describe('Widget', () => {
  describe('empty state', () => {
    it('renders placeholder image using image prop', () => {
      const { getByLabelText } = render(
        <Widget emptyStateProps={{ image: CustomImageComponent }} />
      );
      expect(getByLabelText('custom image component')).toBeInTheDocument();
    });

    it('renders placeholder image using renderImage prop', () => {
      const { getByLabelText } = render(
        <Widget
          emptyStateProps={{
            renderImage: () => <EmptyState401ErrorSvg aria-label="custom image render function" />,
          }}
        />
      );
      expect(getByLabelText('custom image render function')).toBeInTheDocument();
    });

    it('renders placeholder image using renderImage prop when image is falsy', () => {
      const { getByLabelText } = render(
        <Widget
          emptyStateProps={{
            image: null,
            renderImage: () => <EmptyState401ErrorSvg aria-label="custom image render function" />,
          }}
        />
      );
      expect(getByLabelText('custom image render function')).toBeInTheDocument();
    });

    it('renders text', () => {
      const { getByText } = render(
        <Widget
          emptyStateProps={{
            text: 'custom text',
          }}
        />
      );
      expect(getByText('custom text')).toBeInTheDocument();
    });

    it('renders button when onClick is given', () => {
      const onClick = jest.fn();

      const { getByText } = render(
        <Widget
          emptyStateProps={{
            onClick,
          }}
        />
      );

      const btn = getByText('Add a widget');

      fireEvent.click(btn);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders custom button text', () => {
      const onClick = jest.fn();

      const { getByText } = render(
        <Widget
          emptyStateProps={{
            onClick,
            buttonText: 'some button text',
          }}
        />
      );

      expect(getByText('some button text')).toBeInTheDocument();
    });
  });

  describe('header', () => {
    it('renders title', () => {
      const { getByText } = render(<Widget title="the title" />);
      expect(getByText('the title')).toBeInTheDocument();
    });

    it('renders title with productive-heading-03 class', () => {
      const { getByText } = render(<Widget title="the title" />);
      expect(getByText('the title')).toHaveClass(
        `${prefix}--typography-text__productive-heading-03`
      );
    });

    it('renders title with productive-heading-01 class when slim', () => {
      const { getByText } = render(<Widget slim title="the title" />);
      expect(getByText('the title')).toHaveClass(
        `${prefix}--typography-text__productive-heading-01`
      );
    });

    it('renders value', () => {
      const { getByText } = render(<Widget value="the value" />);
      expect(getByText('the value')).toBeInTheDocument();
    });

    it('renders value with productive-heading-04 class', () => {
      const { getByText } = render(<Widget value="the value" />);
      expect(getByText('the value')).toHaveClass(
        `${prefix}--typography-text__productive-heading-04`
      );
    });

    it('renders metadata', () => {
      const { getByText } = render(<Widget metadata={<span>the metadata</span>} />);
      expect(getByText('the metadata')).toBeInTheDocument();
    });

    it('renders actions', () => {
      const { getByText } = render(
        <Widget
          actions={[
            {
              key: 'filter',
              renderIcon: ()=><Filter size={32} />,
              iconDescription: 'Show Filters',
              onClick: () => {},
            },
            {
              key: 'primary',
              text: 'primary btn',
              onClick: () => {},
            },
          ]}
        />
      );
      expect(getByText('primary btn')).toBeInTheDocument();
      expect(getByText('Show Filters')).toBeInTheDocument();
    });

    it('renders overflow menu through overflowMenu prop', () => {
      const { getByLabelText } = render(
        <Widget overflowMenu={<OverflowMenu iconDescription="Custom overflow description" />} />
      );
      expect(getByLabelText('Custom overflow description')).toBeInTheDocument();
    });

    it('renders overflow menu through renderOverflowMenu prop', () => {
      const { getByLabelText } = render(
        <Widget
          renderOverflowMenu={() => <OverflowMenu iconDescription="Custom overflow description" />}
        />
      );
      expect(getByLabelText('Custom overflow description')).toBeInTheDocument();
    });

    it('renders pre actoins through preActions prop', () => {
      const { getByText } = render(<Widget preActions={<span>custom injection point</span>} />);
      expect(getByText('custom injection point')).toBeInTheDocument();
    });

    it('renders pre actoins through renderPreActions prop', () => {
      const { getByText } = render(
        <Widget renderPreActions={() => <span>custom injection point</span>} />
      );
      expect(getByText('custom injection point')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('renders loader', () => {
      const { getByLabelText } = render(<Widget loading />);
      expect(getByLabelText('Loading widget')).toBeInTheDocument();
    });

    it('renders loader with custom props', () => {
      const { getByLabelText, getByText } = render(
        <Widget
          loading
          loadingIndicatorProps={{
            description: 'custom description',
            data: 27,
          }}
        />
      );
      expect(getByLabelText('custom description')).toBeInTheDocument();
      expect(getByText('27%')).toBeInTheDocument();
    });
  });

  describe('content', () => {
    it('renders content', () => {
      const { getByText } = render(
        <Widget>
          <WidgetContent>the content</WidgetContent>
        </Widget>
      );
      expect(getByText('the content')).toBeInTheDocument();
    });
  });
});
