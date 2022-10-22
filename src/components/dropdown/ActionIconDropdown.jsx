/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import settings  from '../../settings';
import classNames from 'classnames';

// import { PropTypes as ListBoxPropTypes } from '@carbon/react/lib/components/ListBox'; // TODO:
import { withTranslation } from '../../translation';

import Menubar from './Menubar';

const { prefix } = settings;
const defaultClassName = `${prefix}--multilevel-dropdown`;
const PORTAL_WRAPPER_CLASSNAME = `${prefix}--portal-wrapper`;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.text : '';
};

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

class ActionIconDropdown extends Component {
  state = {
    currentItem: this.props.initialSelectedItem ? this.props.initialSelectedItem.text : null,
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

  handleOnClick = (e, selectedItem) => {
    e.stopPropagation();
    const { onChange } = this.props;

    if (!this.props.selectedItem) {
      this.setState({ currentItem: selectedItem });
    }

    if (onChange) {
      onChange({ selectedItem });
    }
  };

  handleActionIconClick = (e, item) => {
    e.stopPropagation();
    if (item.iconAction) {
      item.iconAction();
    }
  };

  generateNestedDropDown(items, displayItem) {
    const { itemToString } = this.props;

    return items.map(item => {
      const className = classNames(
        `${defaultClassName}--choose-an-option--list--box-menu-nested--item`,
        {
          [`${defaultClassName}--choose-an-option--list--box-menu-nested--item--selected`]:
            item === displayItem,
        }
      );
      if (item.icon) {
        return (
          <li key={item.id} onClick={e => this.handleOnClick(e, item)} role="none">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */}
            <a
              aria-expanded="false"
              aria-haspopup="true"
              auto-open="true"
              className={className}
              role="menuitem"
            >
              <span
                className={`${defaultClassName}--choose-an-option--list--box-menu-nested--item--span`}
                title={itemToString(item)}
              >
                {itemToString(item)}
              </span>
            </a>
            <ul
              className={`${defaultClassName}--icon-set--icon-list--box-menu-nested`}
              role="none"
              width-correction="50"
            >
              <li
                key={item.id}
                className={`${defaultClassName}--icon-list`}
                onClick={e => this.handleActionIconClick(e, item)}
                role="none"
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  aria-label={item.ariaLabel}
                  className={`${defaultClassName}--icon-set--icon-list--box-menu-nested--item`}
                  tabIndex="-1"
                >
                  {item.icon}
                </a>
              </li>
            </ul>
          </li>
        );
      }
      return (
        <li
          key={item.id}
          className={`${defaultClassName}--list`}
          onClick={e => this.handleOnClick(e, item)}
          role="none"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={className} role="menuitem" tabIndex="-1">
            <span
              className={`${defaultClassName}--choose-an-option--list--box-menu-nested--item--span`}
              title={itemToString(item)}
            >
              {itemToString(item)}
            </span>
          </a>
        </li>
      );
    });
  }

  render() {
    const {
      items,
      renderInPortal,
      t,
      titleText = t('Sort By'),
      itemToString,
      selectedItem,
      type,
      ariaLabel,
      disabled,
    } = this.props;
    const { currentItem } = this.state;

    const displayItem = selectedItem || currentItem;

    const className = classNames(`${defaultClassName}--wrapper`, {
      [`${defaultClassName}--wrapper--inline`]: type === 'inline',
      [`${defaultClassName}--disabled`]: disabled,
    });

    const ulClassName = classNames(`${defaultClassName}--choose-an-option`, {
      [`${defaultClassName}--choose-an-option--inline`]: type === 'inline',
      [`${defaultClassName}--disabled`]: disabled,
    });

    const aClassName = classNames(`${defaultClassName}--choose-an-option--list--box-menu`, {
      [`${defaultClassName}--disabled ${defaultClassName}--choose-an-option--list--box-menu--close`]: disabled,
    });

    const arrowClassName = classNames(
      `${defaultClassName}--choose-an-option--list--box-menu--arrow`,
      {
        [`${defaultClassName}--choose-an-option--list--box-menu--arrow--disabled`]: disabled,
      }
    );

    const titleClassName = classNames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });

    return (
      <nav className={className}>
        {titleText && type !== 'inline' && (
          <div aria-disabled={disabled} className={titleClassName}>
            <span>{titleText}</span>
          </div>
        )}
        <ul
          ref={dropDown => {
            this.dropDown = dropDown;
          }}
          aria-label={ariaLabel}
          className={ulClassName}
          role="menubar"
        >
          <li className={`${defaultClassName}--choose-an-option--list`} role="none">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */}
            <a
              aria-expanded="false"
              aria-haspopup="true"
              className={aClassName}
              role="menuitem"
              tabIndex="0"
            >
              <span className={`${defaultClassName}--choose-an-option--list--box-menu--text`}>
                {displayItem ? itemToString(displayItem) : 'Choose an option'}
              </span>
              <div
                ref={this.arrow}
                className={arrowClassName}
                data-testid={`${prefix}--multilevel-dropdown--choose-an-option--list--box-menu--arrow`}
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
                  className={`${defaultClassName}--choose-an-option--list--box-menu-nested ${prefix}--portal-rendered ${defaultClassName}--limited-height`}
                  role="menu"
                >
                  {this.generateNestedDropDown(items, displayItem)}
                </ul>
              </Portal>
            ) : (
              <ul
                ref={nestedList => {
                  this.nestedList = nestedList;
                }}
                className={`${defaultClassName}--choose-an-option--list--box-menu-nested ${defaultClassName}--limited-height`}
                role="menu"
              >
                {this.generateNestedDropDown(items, displayItem)}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

ActionIconDropdown.propTypes = {
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  initialSelectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  itemToString: PropTypes.func,
  onChange: PropTypes.func,
  renderInPortal: PropTypes.bool,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * i18next translate function comming from withTranslation HOC
   */
  t: PropTypes.func.isRequired,
  titleText: PropTypes.string,
//  type: ListBoxPropTypes.ListBoxType,
};

ActionIconDropdown.defaultProps = {
  ariaLabel: undefined,
  disabled: false,
  initialSelectedItem: undefined,
  itemToString: defaultItemToString,
  onChange: noop,
  renderInPortal: false,
  selectedItem: null,
  titleText: '',
  type: 'default',
};

export default withTranslation()(ActionIconDropdown);
