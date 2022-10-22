/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import { keys, match } from '../keyboard';
import React from 'react';
import PropTypes from 'prop-types';
import settings  from '../../settings';
import noop from 'lodash/noop';

const { prefix } = settings;

export default Component => {
  class ExpandableHoC extends React.Component {
    state = {};

    static getDerivedStateFromProps({ open, expands }, state) {
      const { prevOpen } = state;

      if (!expands) {
        return { open: false };
      }

      return prevOpen === open
        ? null
        : {
            open: expands && open,
            prevOpen: open,
          };
    }

    handleHeadingClick = evt => {
      const { onHeadingClick } = this.props;
      if (!this.props.noPropagation) {
        this.setState(({ open }) => {
          return { open: !open };
        });
        if (onHeadingClick) onHeadingClick(evt);
      }
    };

    handleHeadingKeyDown = evt => {
      if (
        !this.props.noPropagation &&
        match(evt.which, keys.Escape) &&
        this.state.open &&
        evt.target.classList.contains(`${prefix}--expandable-hoc-target`)
      ) {
        this.handleHeadingClick(evt);
      }
    };

    render() {
      const { props, state } = this;
      const { open } = state;
      return (
        <Component
          handleHeadingClick={this.handleHeadingClick}
          handleHeadingKeyDown={this.handleHeadingKeyDown}
          targetClassName={`${prefix}--expandable-hoc-target`}
          {...props}
          open={open}
        />
      );
    }
  }

  ExpandableHoC.propTypes = {
    expands: PropTypes.bool,
    noPropagation: PropTypes.bool,
    onHeadingClick: PropTypes.func,
    open: PropTypes.bool,
  };

  ExpandableHoC.defaultProps = {
    expands: false,
    noPropagation: false,
    onHeadingClick: noop,
    open: false,
  };

  return ExpandableHoC;
};
