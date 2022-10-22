/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import { createBrowserHistory } from 'history';

const PUBLIC_PATH = 'yourappuipath/resourcepath'; //process.env.PUBLIC_PATH || '';
const BASE_NAME = PUBLIC_PATH ? `/${PUBLIC_PATH}` : '';


const routerCfg = { basename: BASE_NAME };

const routerHistory = createBrowserHistory(routerCfg);

const navigations = [
  {
    id: 'overview',
    title: 'Overview',
    name: 'overview',
    navigation: {
      route: {
        path: '/overview',
      },
    },
  },
  // {
  //   id: 'dndlayout',
  //   title: 'Overview(Draft)',
  //   name: 'dndlayout',
  //   navigation: {
  //     route: {
  //       path: '/dndlayout',
  //     },
  //   },
  // },
  {
    id: 'strategy',
    title: 'Strategy',
    name: 'strategy',
    navigation: {
      route: {
        path: '/strategy',
      },
    },
  },
  {
    id: 'review',
    title: 'Review',
    name: 'review',
    navigation: {
      route: {
        path: '/review',
      },
    },
  },
];

const navigation = {
  features: [...navigations],
};

export default {
  routerCfg,
  routerHistory,
  navigation,
};
