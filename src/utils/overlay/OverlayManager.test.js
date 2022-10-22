/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */

import { OverlayManager } from '.';

describe('OverlayManager', () => {
  test('OverlayManager create with empty config behave safe', () => {
    const result = new OverlayManager();
    expect(result.config).not.toBeUndefined();
    expect(result.portalNode).not.toBeUndefined();
    expect(result.id).toBe('');
    expect(result.portalClassNames.length).toBe(0);
    expect(result.itemsCount).toBe(0);
  });

  test('OverlayManager configuration immutable', () => {
    const manager = new OverlayManager({ id: 'testId' });
    const attemptToChange = () => {
      manager.config.id = 'attemptToChange';
    };
    expect(attemptToChange).toThrow(Error);
    expect(manager.id).toBe('testId');
  });

  test('OverlayManager manage items correct', () => {
    const myFunc = jest
      .fn(root => {
        expect(root instanceof HTMLDivElement).toBe(true);
      })
      .mockName('myFunc');

    const manager = new OverlayManager({
      id: 'testId',
      portal: {
        id: 'testRootDivId',
        classNames: ['c1', 'c2'],
      },
      onRootCreate: myFunc,
    });
    expect(manager.id).toBe('testId');
    expect(manager.portalNode instanceof HTMLDivElement).toBe(true);
    expect(manager.portalNode.classList).not.toBeUndefined();
    expect(myFunc).toHaveBeenCalledTimes(1);

    expect(manager.itemsCount).toBe(0);
    expect(manager.getItems().length).toBe(0);

    let inserted = manager.registerItem();
    expect(inserted).toBe(false);
    expect(manager.itemsCount).toBe(0);
    expect(manager.getItems().length).toBe(0);
    expect(manager.getItemData()).toMatchObject({});

    const item1 = { id: 'item1' };
    const item1Details = { details: 'detailsOfItem1' };
    inserted = manager.registerItem(item1, item1Details);
    expect(inserted).toBe(true);

    inserted = manager.registerItem(item1, item1Details);
    // insert again, still true, details updated
    expect(inserted).toBe(true);

    expect(manager.itemsCount).toBe(1);
    expect(manager.hasRegisteredItem(item1)).toBeTruthy();
    expect(manager.getItems().length).toBe(1);
    expect(manager.getItems()[0].item).toStrictEqual(item1);
    expect(manager.getItems()[0].details).toStrictEqual(item1Details);
    expect(manager.getItemData(item1)).toStrictEqual(item1Details);

    expect(() => {
      manager.processAutoUpdateItems();
    }).not.toThrow(Error);

    expect(() => {
      manager.cancelRafAutoUpdate();
    }).not.toThrow(Error);

    let deleted = manager.unRegisterItem();
    expect(deleted).toBe(false);
    deleted = manager.unRegisterItem({});
    expect(deleted).toBe(false);

    deleted = manager.unRegisterItem(item1);
    expect(deleted).toBe(true);
  });
});
