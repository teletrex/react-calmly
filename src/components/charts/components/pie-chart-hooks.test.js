/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import { useHighlightedActiveShape, useTooltipFollowsCursor } from './pie-chart-hooks';

describe('hooks', () => {
  describe('useHighlightedActiveShape', () => {
    it('should change active index on mouse over and mouse leave', () => {
      const { result } = renderHook(() => {
        return useHighlightedActiveShape();
      });
      expect(result.current.activeIndex).toBe(null);

      act(() => {
        result.current.onMouseOver(null, 1);
      });

      expect(result.current.activeIndex).toBe(1);

      act(() => {
        result.current.onMouseLeave();
      });

      expect(result.current.activeIndex).toBe(null);
    });

    it('should render ActiveShape component', () => {
      const { result } = renderHook(() => {
        return useHighlightedActiveShape();
      });

      const { container } = render(
        result.current.renderActiveShape({
          color: '#fff',
          cx: 0,
          cy: 0,
          endAngle: 0,
          fill: '#fff',
          midAngle: 0,
          outerRadius: 0,
          startAngle: 0,
          stroke: '#fff',
        })
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('useTooltipFollowsCursor', () => {
    it('should not break if chart ref is not provided', () => {
      const { result } = renderHook(() => {
        return useTooltipFollowsCursor(null, document.createElement('div'));
      });

      const onMouseEvent = result.current;

      expect(() => {
        onMouseEvent(null, null, {});
      }).not.toThrow();
    });

    it('should not break if tooltip ref is not provided', () => {
      const { result } = renderHook(() => {
        return useTooltipFollowsCursor(document.createElement('div'), null);
      });

      const onMouseEvent = result.current;

      expect(() => {
        onMouseEvent(null, null, {});
      }).not.toThrow();
    });

    it('should not break if mouse event is not provided', () => {
      const { result } = renderHook(() => {
        const el = document.createElement('div');

        return useTooltipFollowsCursor(el, el);
      });

      const onMouseEvent = result.current;

      expect(() => {
        onMouseEvent(null, null, null);
      }).not.toThrow();
    });

    it('should adjust tooltip position to the position of cursor', () => {
      const chartElement = document.createElement('div');
      const tooltipElement = document.createElement('div');

      const { result } = renderHook(() => useTooltipFollowsCursor(chartElement, tooltipElement));

      const onMouseEvent = result.current;

      onMouseEvent(null, null, { clientX: 300, clientY: 300 });

      expect(tooltipElement.style.transform).toBe('translate(272px, 310px)');
    });
  });
});
