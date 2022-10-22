/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CaretRight, ChevronDown } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import settings from '../../settings';
import noop from 'lodash/noop';

import { withTranslation } from '../../translation';

import Menubar from './Menubar';

const { prefix } = settings;
const defaultClassName = `${prefix}--multilevel-dropdown`;
const PORTAL_WRAPPER_CLASSNAME = `${prefix}--portal-wrapper`;

const Portal = ({ children }) => {
  const mount = document.body;
  const el = document.createElement('div');
  el.classList.add(`${defaultClassName}--wrapper`);
  el.classList.add(PORTAL_WRAPPER_CLASSNAME);

  useEffect(() => {
    mount.appendChild(el);

    return () => mount.removeChild(el);
  }, [el, mount]);

  return ReactDOM.createPortal(children, el);
};

class MultilevelDropdown extends Component {
  state = {
    chosen: this.props.initialSelectedItem ? this.props.initialSelectedItem.text : '',
  };

  constructor(props) {
    super(props);
    this.dropDown = React.createRef();
    this.arrow = React.createRef();
    this.nestedList = React.createRef();
  }

  componentDidMount() {
    const menubar = new Menubar(this.dropDown, this.arrow, this.nestedList);
    menubar.init();
  }

  componentDidUpdate() {
    const menubar = new Menubar(this.dropDown, this.arrow, this.nestedList);
    menubar.init();
  }

  handleClick = (e, item) => {
    e.stopPropagation();
    const { onChange } = this.props;
    if (typeof item === 'string') {
      this.setState({ chosen: item });
      if (onChange) {
        onChange({ item });
      }
    } else {
      this.setState({ chosen: item.text });
      if (onChange) {
        onChange({ item: item.text, ...item });
      }
    }
  };

  generateNestedDropDown(items) {
    const { isParentSelectable } = this.props;
    return items.map(item => {
      if (item.sublist) {
        return (
          <li
            key={item.id}
            onClick={e => isParentSelectable && this.handleClick(e, item)}
            role="none"
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */}
            <a
              aria-expanded="false"
              aria-haspopup="true"
              className={`${defaultClassName}--choose-an-option--list--box-menu-nested--item`}
              role="menuitem"
            >
              <span>{item.text}</span>
              <CaretRight size={16} />
            </a>
            <ul
              className={`${defaultClassName}--choose-an-option--list--box-menu-nested`}
              role="menu"
            >
              {this.generateNestedDropDown(item.sublist)}
            </ul>
          </li>
        );
      }
      return (
        <li
          key={item.id}
          className={`${defaultClassName}--list`}
          onClick={e => this.handleClick(e, item)}
          role="none"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={`${defaultClassName}--choose-an-option--list--box-menu-nested--item`}
            role="menuitem"
            tabIndex="-1"
          >
            {item.text}
          </a>
        </li>
      );
    });
  }

  render() {
    const {
      className,
      light,
      items,
      renderInPortal,
      t,
      titleText = t('Sort By'),
      label = t('Choose an option'),
    } = this.props;
    const { chosen } = this.state;

    const currentLabel = chosen === '' ? label : chosen;

    return (
      <nav className={classNames(className, `${defaultClassName}--wrapper`)}>
        {titleText && (
          <div aria-disabled="false" className={`${prefix}--label`}>
            <span>{titleText}</span>
          </div>
        )}
        <ul
          ref={dropDown => {
            this.dropDown = dropDown;
          }}
          className={classNames(`${defaultClassName}--choose-an-option`, {
            [`${defaultClassName}--choose-an-option--light`]: light,
          })}
          role="menubar"
        >
          <li className={`${defaultClassName}--choose-an-option--list`} role="none">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */}
            <a
              aria-expanded="false"
              aria-haspopup="true"
              className={`${defaultClassName}--choose-an-option--list--box-menu`}
              role="menuitem"
              tabIndex="0"
            >
              <span>{currentLabel}</span>
              <div
                ref={this.arrow}
                className={`${defaultClassName}--choose-an-option--list--box-menu--arrow`}
              >
                <ChevronDown size={16} />
              </div>
            </a>
            {renderInPortal ? (
              <Portal>
                <ul
                  ref={nestedList => {
                    this.nestedList = nestedList;
                  }}
                  className={`${defaultClassName}--choose-an-option--list--box-menu-nested ${prefix}--portal-rendered`}
                  role="menu"
                >
                  {this.generateNestedDropDown(items)}
                </ul>
              </Portal>
            ) : (
              <ul
                ref={nestedList => {
                  this.nestedList = nestedList;
                }}
                className={`${defaultClassName}--choose-an-option--list--box-menu-nested`}
                role="menu"
              >
                {this.generateNestedDropDown(items)}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

MultilevelDropdown.propTypes = {
  className: PropTypes.string,
  initialSelectedItem: PropTypes.shape({ id: PropTypes.string, text: PropTypes.string }),
  isParentSelectable: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  label: PropTypes.string,
  light: PropTypes.bool,
  onChange: PropTypes.func,
  renderInPortal: PropTypes.bool,
  /**
   * i18next translate function comming from withTranslation HOC
   */
  t: PropTypes.func.isRequired,
  titleText: PropTypes.string,
};

MultilevelDropdown.defaultProps = {
  className: '',
  initialSelectedItem: undefined,
  isParentSelectable: false,
  label: undefined,
  light: false,
  onChange: noop,
  renderInPortal: false,
  titleText: '',
};

export default withTranslation()(MultilevelDropdown);
