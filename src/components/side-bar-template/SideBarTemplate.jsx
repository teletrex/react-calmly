/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useRef, useEffect, useState, createElement } from 'react';
import classNames from 'classnames';
import settings from '../../settings';
import PropTypes from 'prop-types';

import {
  ChevronLeft,
  ChevronRight,
  Close,
  Maximize,
  Minimize,
} from '@carbon/icons-react';
import noop from 'lodash/noop';

import { useTranslation } from '../../translation';
import { Overlays } from '../../utils/overlay';

const { prefix } = settings;

export const SIZE = {
  TREE_NAV: 'treeNav',
  DEFAULT: 'default',
  WIDE: 'wide',
  HALF: 'half',
};

const wrapElement = (headerProp, tag) =>
  typeof headerProp === 'string' ? createElement(tag, null, headerProp) : headerProp;

const withRenderContent = (config = { className: '' }) => ({
  children,
  scrollToTop,
  scrollContentToTopDep,
}) => {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (scrollToTop) {
      sectionRef.current.scrollTop = 0;
    }
  }, [scrollContentToTopDep, scrollToTop]);
  return (
    <section ref={sectionRef} className={config.className} onScroll={Overlays.updateItemsPosition}>
      {children}
    </section>
  );
};

const RenderContent = withRenderContent({ className: `${prefix}--side-bar-template__content` });
RenderContent.displayName = 'SideBarTemplateContent';

const SideBarTemplate = ({
  ariaLabel,
  show: initShow,
  sideBarBody,
  actionBar,
  sideBarFooter,
  sideBarHeader,
  size,
  overlay,
  showCloseButton,
  showSeparator,
  marginlessPanel,
  place,
  children,
  className,
  controlledOutside,
  onCloseCallback,
  toggleShowOnClose,
  triggerRef,
  showExpander,
  scrollContentToTop,
  scrollContentToTopDep,
  isResponsive,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(initShow);
  const prevShowRef = useRef(initShow);
  const closeButton = useRef(null);

  const onClose = () => {
    if (toggleShowOnClose) {
      setShow(prevState => !prevState);
    }
    onCloseCallback();
  };

  const renderCloseButtonIcon = () => (show ? <Close size={20} /> : null);

  useEffect(() => {
    setShow(initShow);
  }, [initShow]);

  useEffect(() => {
    if (show && closeButton && closeButton.current) {
      closeButton.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const prevShow = prevShowRef.current;
    if (prevShow && !show) {
      if (triggerRef) {
        triggerRef.focus();
      }
    }
    prevShowRef.current = show;
  }, [triggerRef, show]);

  const sideBarWrapperClasses = classNames(`${prefix}--side-bar-template__wrapper`, {
    [`${prefix}--side-bar-template__overlay`]: overlay,
    [`${prefix}--side-bar-template__hidden-border`]: !showSeparator || !show,
    [`${prefix}--side-bar-template__wrapper--${size}`]: show && Object.values(SIZE).includes(size),
  });

  const StickyContainer = () => (
    <div className={`${prefix}--side-bar-template__sticky-top-container`}>{actionBar}</div>
  );

  return (
    <div className={classNames(className, `${prefix}--side-bar-template`)} {...otherProps}>
      {place === 'right' && (
        <RenderContent
          scrollContentToTopDep={scrollContentToTopDep}
          scrollToTop={scrollContentToTop}
        >
          {actionBar && <StickyContainer />}
          {children}
        </RenderContent>
      )}
      {showExpander && (
        <div
          className={classNames(
            `${prefix}--side-bar-template__expander`,
            {
              [`${prefix}--side-bar-template__expander--responsive`]: isResponsive && show,
            },
            {
              [`${prefix}--side-bar-template__expander--${size}`]:
                place === 'left' && show && Object.values(SIZE).includes(size),
            },
            {
              [`${prefix}--side-bar-template__expander--${size}-right`]:
                place === 'right' && show && Object.values(SIZE).includes(size),
            },
            {
              [`${prefix}--side-bar-template__expander--collapsed-right`]:
                place === 'right' && !show,
            },
            { [`${prefix}--side-bar-template__expander--collapsed`]: place === 'left' && !show }
          )}
          onClick={() => {
            setShow(!show);
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) setShow(!show);
          }}
          role="button"
          tabIndex={0}
        >
          {!show ? (
            <Minimize16 aria-label={t('Expand left Sidebar')} />
          ) : (
            <Maximize16 aria-label={t('Collapse left Sidebar')} />
          )}
        </div>
      )}
      {
        <aside
          aria-label={ariaLabel}
          className={sideBarWrapperClasses}
          onScroll={Overlays.updateItemsPosition}
        >
          {showCloseButton && (
            <div style={{ overflow: 'auto' }}>
              <button
                ref={closeButton}
                aria-label={t('close sidebar')}
                className={classNames(`${prefix}--side-bar-template__bar__close`, {
                  [`${prefix}--side-bar-template__bar__close--hidden`]: !show,
                })}
                onClick={onClose}
                tabIndex={0}
                title={t('Close')}
                type="button"
              >
                {renderCloseButtonIcon()}
              </button>
            </div>
          )}
          {show && (
            <div className={classNames(`${prefix}--side-bar-template__bar`)}>
              {wrapElement(sideBarHeader, 'h3')}
              <div
                className={classNames(
                  { [`${prefix}--side-bar-template__bar-content`]: !marginlessPanel },
                  {
                    [`${prefix}--side-bar-template__bar-content--marginless`]: marginlessPanel,
                  },
                  {
                    [`${prefix}--side-bar-template__bar-content--with-footer`]: !!sideBarFooter,
                  }
                )}
              >
                {sideBarBody}
              </div>
              <div className={classNames(`${prefix}--side-bar-template__bar-footer`)}>
                {sideBarFooter}
              </div>
            </div>
          )}
          {!showExpander && !show && !controlledOutside && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className={`${prefix}--side-bar-template__open-bar`} onClick={onClose}>
              {place === 'left' ? (
                <ChevronRight size={20} viewBox="-7 0 34 34" />
              ) : (
                <ChevronLeft size={20} viewBox="-7 0 34 34" />
              )}
            </div>
          )}
        </aside>
      }
      {place === 'left' && (
        <RenderContent
          scrollContentToTopDep={scrollContentToTopDep}
          scrollToTop={scrollContentToTop}
        >
          {actionBar && <StickyContainer />}
          {children}
        </RenderContent>
      )}
    </div>
  );
};

SideBarTemplate.propTypes = {
  actionBar: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  controlledOutside: PropTypes.bool,
  isResponsive: PropTypes.bool,
  marginlessPanel: PropTypes.bool,
  onCloseCallback: PropTypes.func,
  overlay: PropTypes.bool,
  place: PropTypes.string,
  scrollContentToTop: PropTypes.bool,
  scrollContentToTopDep: PropTypes.oneOf([PropTypes.object, PropTypes.node]),
  show: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showExpander: PropTypes.bool,
  showSeparator: PropTypes.bool,
  sideBarBody: PropTypes.node,
  sideBarFooter: PropTypes.node,
  sideBarHeader: PropTypes.node,
  size: PropTypes.oneOf([SIZE.TREE_NAV, SIZE.DEFAULT, SIZE.WIDE, SIZE.HALF]),
  toggleShowOnClose: PropTypes.bool,
  /* eslint-disable-next-line react/require-default-props */
  triggerRef: PropTypes.instanceOf(Element),
};

SideBarTemplate.defaultProps = {
  actionBar: null,
  ariaLabel: 'side-bar',
  children: null,
  className: '',
  controlledOutside: false,
  isResponsive: false,
  marginlessPanel: false,
  onCloseCallback: noop,
  overlay: false,
  place: 'left',
  scrollContentToTop: false,
  scrollContentToTopDep: null,
  show: false,
  showCloseButton: true,
  showExpander: false,
  showSeparator: true,
  sideBarBody: null,
  sideBarFooter: null,
  sideBarHeader: null,
  size: SIZE.DEFAULT,
  toggleShowOnClose: true,
};

export default SideBarTemplate;
