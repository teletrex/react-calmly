/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from './reducers';

import {
  Accordion,
  AccordionItem,
} from '@carbon/react';

import useTranslation from '../../i18n';


export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleAccordionStatus = useCallback((evt, id) => {
    dispatch(actions.changeAccordionTab(id));
  }, []);

  return (
    <Accordion open={true}
      alignWithContent={false}
      type="default"
    >
      <AccordionItem
        actionsConfig={[]}
        amount={undefined}
        bolderHeader={false}
        disabled={false}
        iconDescription=""
        isHeadingClickable
        large={false}
        overflowMenuConfig={{}}
        title={t('usermanagement.users')}
        key="users"
        onHeadingClick={(evt) => {
          handleAccordionStatus(evt, 0);
        }} />

      <AccordionItem
        actionsConfig={[]}
        amount={undefined}
        bolderHeader={false}
        disabled={false}
        iconDescription=""
        isHeadingClickable
        large={false}
        overflowMenuConfig={{}}
        title={t('usermanagement.roles')}
        key="roles"
        onHeadingClick={(evt) => {
          handleAccordionStatus(evt, 1);
        }} />

      <AccordionItem
        actionsConfig={[]}
        amount={undefined}
        bolderHeader={false}
        disabled={false}
        iconDescription=""
        isHeadingClickable
        large={false}
        overflowMenuConfig={{}}
        title={t('usermanagement.permissions')}
        key="permissions"
        onHeadingClick={(evt) => {
          handleAccordionStatus(evt, 2);
        }} />
    </Accordion>
  );
};
