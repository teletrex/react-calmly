/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

import { parseFilename } from './utils';

describe('parseFilename', () => {
  it.each([
    [
      'illustrations/EmptyState_401Error_200px.svg',
      { name: 'EmptyState401ErrorSvg', size: 200, width: undefined, height: undefined },
    ],
    [
      'illustrations/EmptyState_AddDimensions_100px.svg',
      { name: 'EmptyStateAddDimensionsSvg', size: 100, width: undefined, height: undefined },
    ],
    [
      'illustrations/EmptyState_VMTA_150px.svg',
      { name: 'EmptyStateVMTASvg', size: 150, width: undefined, height: undefined },
    ],
    [
      'illustrations/Placeholder_100px.svg',
      { name: 'PlaceholderSvg', size: 100, width: undefined, height: undefined },
    ],
    [
      'illustrations/Deprecated_EmptyView_145x102px.svg',
      { name: 'DeprecatedEmptyViewSvg', size: undefined, width: 145, height: 102 },
    ],
    [
      'something/more/extra/long/path/My_File_99px.svg',
      { name: 'MyFileSvg', size: 99, width: undefined, height: undefined },
    ],
    [
      'windows\\path\\works\\My_File_99px.svg',
      { name: 'MyFileSvg', size: 99, width: undefined, height: undefined },
    ],
    [
      'Tricky_200px_Numbers_300x400px_1px.svg',
      { name: 'Tricky200pxNumbers300x400pxSvg', size: 1, width: undefined, height: undefined },
    ],
    [
      // known issue with filename coming from designers
      'Acoustic_EmptyState_PublishingMyitemsinREVIEW_150px.svg',
      {
        name: 'EmptyStatePublishingMyitemsInReviewSvg',
        size: 150,
        width: undefined,
        height: undefined,
      },
    ],
    [
      'illustrations/EmptyState-401Error-200px.svg',
      { name: 'EmptyState401ErrorSvg', size: 200, width: undefined, height: undefined },
    ],
    [
      'illustrations/EmptyState-AddDimensions-100px.svg',
      { name: 'EmptyStateAddDimensionsSvg', size: 100, width: undefined, height: undefined },
    ],
    [
      'illustrations/EmptyState-VMTA-150px.svg',
      { name: 'EmptyStateVMTASvg', size: 150, width: undefined, height: undefined },
    ],
    [
      'illustrations/Placeholder-100px.svg',
      { name: 'PlaceholderSvg', size: 100, width: undefined, height: undefined },
    ],
    [
      'illustrations/Deprecated-EmptyView-145x102px.svg',
      { name: 'DeprecatedEmptyViewSvg', size: undefined, width: 145, height: 102 },
    ],
    [
      'something/more/extra/long/path/My-File-99px.svg',
      { name: 'MyFileSvg', size: 99, width: undefined, height: undefined },
    ],
    [
      'windows\\path\\works\\My-File-99px.svg',
      { name: 'MyFileSvg', size: 99, width: undefined, height: undefined },
    ],
    [
      'Tricky-200px-Numbers-300x400px-1px.svg',
      { name: 'Tricky200pxNumbers300x400pxSvg', size: 1, width: undefined, height: undefined },
    ],
  ])('correctly parses the filename %s', (filename, result) => {
    expect(parseFilename(filename)).toStrictEqual(result);
  });
});
