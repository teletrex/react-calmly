/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useState, useCallback, useMemo } from 'react';
import { select } from '@storybook/addon-knobs';
import {Modal, Button} from '@carbon/react';
import { useTranslation } from '../../../translation';
import MagicTable from '../../magic-table/MagicTable';



import AddTags from '..';

const TagCellExample = ({ id, tags, onChange }) => {
  const handleChange = useCallback(tags => onChange(id, tags), [id, onChange]);

  return (
    <AddTags
      id={`tag-input-table-${id}`}
      inline
      onAddTag={handleChange}
      onDelete={handleChange}
      tags={tags}
      size={"sm"}
    />
  );
};

const configFactory = onTagChange => [
  {
    id: 'columnHeaderOne',
    renderHeader: () => 'File',
    renderCol: item => item.file,
  },

  {
    id: 'columnHeaderFour',
    renderHeader: () => 'Tags',
    renderCol: item => <TagCellExample id={item.id} onChange={onTagChange} tags={item.tags} />,
  },
];

const initialRows = [
  {
    id: 1,
    file: 'some_picture.png',
    name: 'People on garden',
    tags: ['Image', 'Garden', 'People playing', 'family'],
  },
  {
    id: 2,
    file: 'some_other_picture.png',
    name: 'some name',
    tags: ['Things', 'Objects', 'Many many tags'],
  },
  {
    id: 3,
    file: 'picture.png',
    name: 'No tags',
    tags: null,
  },
];

const AddTagsInMagicTable = () => {
  const t  = (a,b) => b;
  const [data, setData] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const handleTagChange = useCallback(
    (id, tags) => {
      setData(data.map(item => (item.id === id ? { ...item, tags } : item)));
    },
    [data, setData]
  );
  const config = useMemo(() => configFactory(handleTagChange), [handleTagChange]);

  const size = select(
    'Row height (size)',
    { compact: 'compact', short: 'short', tall: 'tall', none: null },
    'short'
  );

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        isMedium
        modalHeading="Modal heading"
        onRequestClose={() => setOpen(false)}
        open={open}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        size={"large"}
      >
        <MagicTable
          t={t}
          config={config}
          dataRows={data}
          description={t('With toolbar')}
          hasPagination={false}
          hasSelection={false}
          size={size}
        />
      </Modal>
    </>
  );
};

export default AddTagsInMagicTable;
