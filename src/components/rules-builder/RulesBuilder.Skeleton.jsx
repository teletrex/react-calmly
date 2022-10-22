/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import settings  from '../../settings';

const { prefix } = settings;

const RulesBuilderSkeleton = () => {
  const renderItemSkeleton = () => (
    <div className={`${prefix}--rule-element-container`}>
      <div className={`${prefix}--rule-element--item`}>
        <div className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--label ${prefix}--skeleton`} />
      </div>
    </div>
  );

  return (
    <div className={`${prefix}--rules-builder ${prefix}--rules-builder-skeleton`}>
      {renderItemSkeleton()}
      {renderItemSkeleton()}
      {renderItemSkeleton()}
    </div>
  );
};

export default RulesBuilderSkeleton;
