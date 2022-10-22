/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { renderHook } from '@testing-library/react-hooks';

import { mockPageOffset } from '../test-helpers/window-mocks';
import { TOOLTIPS_OVERLAY_CONFIG, TooltipsOverlayManager } from '../../tooltip';

import { getOverlayOffsetFixed, OverlayManager, Overlays, useOverlayManager } from '.';

describe('Overlays', () => {
  test('Overlays instance defined/undefined', () => {
    expect(Overlays.getInstance(undefined)).toBeUndefined();
    expect(Overlays.getInstance('unknown')).toBeUndefined();

    // default config have to pre populated
    expect(Overlays.getInstance(TOOLTIPS_OVERLAY_CONFIG.id)).not.toBeUndefined();

    // modal root node is defined
    expect(Overlays.modalRootNode).not.toBeUndefined();

    Overlays.unRegister('no-this-id-registered');

    let screen = null;
    expect(() => {
      screen = Overlays.screenBounds;
    }).not.toThrow(Error);

    expect(screen).not.toBeNull();
    expect(screen).not.toBeUndefined();
  });

  test('Overlays register bad cases', () => {
    // require config
    expect(() => {
      Overlays.register(undefined);
    }).toThrow(Error);

    // require config.id
    expect(() => {
      Overlays.register({});
    }).toThrow(Error);

    // require config.portal
    expect(() => {
      Overlays.register({
        id: '321',
        ClassFactory: TooltipsOverlayManager,
      });
    }).toThrow(Error);

    // require config.portal.id
    expect(() => {
      Overlays.register({ id: '321', ClassFactory: TooltipsOverlayManager, portal: {} });
    }).toThrow(Error);

    // require config.ClassFactory
    expect(() => {
      Overlays.register({ id: '321', portal: { id: 'div321' } });
    }).toThrow(Error);

    // config is correct
    expect(() => {
      Overlays.register({ id: '321', portal: { id: 'div321' }, ClassFactory: OverlayManager });
    }).not.toThrow(Error);

    // config id is the same as already registered
    expect(() => {
      Overlays.register({ id: '321' });
    }).not.toThrow(Error);

    expect(Overlays.unRegister('321')).not.toBeUndefined();
    expect(Overlays.unRegister(undefined)).toBeUndefined();
  });

  test('Overlays register instance', () => {
    const result = Overlays.register({
      id: 'testId',
      ClassFactory: OverlayManager,
      portal: { id: 'testIdPortal' },
    });
    expect(result instanceof OverlayManager).toBe(true);

    const theSameResult = Overlays.register({ id: 'testId', ClassFactory: OverlayManager });
    expect(result instanceof OverlayManager).toBe(true);
    expect(theSameResult).toStrictEqual(result);

    Overlays.updateItemsPosition();

    expect(Overlays.unRegister('testId')).not.toBeUndefined();
  });
});

describe('useOverlayManager', () => {
  it('should return configured TooltipsOverlayManager', () => {
    const { result, rerender } = renderHook(() => {
      return useOverlayManager({
        id: 'testId',
        ClassFactory: TooltipsOverlayManager,
        portal: { id: 'testIdPortal' },
      });
    });
    const manager = result.current[0];
    expect(manager).not.toBeUndefined();
    const updatePos = result.current[1];

    updatePos();

    rerender();
    const manager2 = result.current[0];
    // have to return the same manager
    expect(manager2).toStrictEqual(manager);

    expect(Overlays.unRegister('testId')).not.toBeUndefined();
  });
});

describe('getOverlayMenuOffsetFixed', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('should compensate base <carbon::TooltipFix... offsetFunction by window pageXOffset/pageYOffset', () => {
    const result = getOverlayOffsetFixed(() => {})();
    expect(result.top).toBe(0);
    expect(result.left).toBe(0);

    mockPageOffset({ x: 100, y: -200 });

    const resultScrolled = getOverlayOffsetFixed(() => {})();
    expect(resultScrolled.top).toBe(200);
    expect(resultScrolled.left).toBe(-100);
  });

  describe('useOverlayManager', () => {
    it('should works internally correct', () => {
      const { result, rerender } = renderHook(() => {
        return useOverlayManager({
          id: 'internallyId',
          ClassFactory: TooltipsOverlayManager,
          portal: {
            id: 'internallyRootDivId',
          },
          behavior: {
            updatePositions: {
              onWindowScroll: true,
              onWindowResize: true,
            },
          },
        });
      });

      const manager = result.current[0];
      expect(manager).not.toBeUndefined();
      const updatePos = result.current[1];

      expect(manager.toString()).toBe('TooltipsOverlayManager(internallyId)');

      updatePos();
      manager.updateWindowListeners();

      manager.$rafId = 15;
      manager.handleWindowEvent('resize', true);
      manager.handleWindowEvent('resize', false);

      manager.handleWindowEvent('scroll', true);
      manager.handleWindowEvent('scroll', false);

      rerender();

      expect(Overlays.unRegister('internallyId')).not.toBeUndefined();
    });
  });
});
