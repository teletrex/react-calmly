/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useEffect } from 'react';

import {
  UserAvatar,
  Help,
  Grid,
  Favorite,
  Workspace,
  Search,
  ChartBar,
  Fade,
  TableSplit,
  Document,
} from '@carbon/icons-react';
import  settings  from '../../settings';
import PropTypes from 'prop-types';
//import { cloneDeep, isNumber, isString, find, debounce, isEmpty } from 'lodash';

import Notifications from '../../notifications';

import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderName,
  HeaderMenuButton,
  HeaderNavigation,
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  SideNavItems,
  SideNavHeader,
  SideNavLink,
  HeaderMenuItem

} from '@carbon/react';

/*
import {
  Profile,
  ProductsList,
  ThemeProvider,
  THEMES,
  SearchBar,
  SearchGroup,
  SearchHeader,
  SearchElement,
  SearchElementContent,
  InsightsFlag
}
*/

import shellConfig from '../../shellConfig';

import useHeaderService from './ExampleHeaderService';

import useAuthorizations from "../../usermanagement/useAuthorizations";
import SearchButtonContainer from '../search-button/SearchButtonContainer';
import SearchContextProvider,{SearchContext} from "../../contexts/SearchContext";

import imageFile from '../../assets/icons/lfr.jpg';

const { navigation: staticNavigation } = shellConfig;
const KNOB_GROUPS = {
  NOTIFICATIONS_MENU: 'NotificationsMenu',
  PRODUCTS: 'ProductsList',
  PROFILE: 'Profile',
};

const { prefix } = settings;

{/*
const PUBLISHING_STATUS = ['published', 'approved', 'draft , in Review', 'pending'];

const generateNotification = index => ({
  id: index,
  title: `Overage detected ${index}`,
  text:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, asperiores dolorem ducimus eaque expedita, ipsam ipsum mollitia nulla odit quaerat quis quod ratione sint sunt tempore totam ut voluptatum! Rerum!',
  date: moment().subtract(index, 'days').toISOString(),
  from: 'Campaign',
  category: 'Type',
  link: index % 3 === 0 ? 'https://teletrex.com' : undefined,
});

const getNotifications = (noOfNotifications = 10) =>
  new Array(noOfNotifications).fill({}).map((value, index) => generateNotification(index));

const defaultFilterData = {
  types: [
    { key: 'normal-priority', label: 'Normal priority', value: false, count: 2 },
    { key: 'high-priority', label: 'High priority', value: false, count: 1 },
    { key: 'success', label: 'Success', value: false },
    { key: 'failure', label: 'Failure', value: false, count: 1 },
  ],
  froms: [
    { key: 'campaign', label: 'Campaign', value: false, count: 2 },
    { key: 'content', label: 'Content', value: false, count: 1 },
    { key: 'personalization', label: 'Personalization', value: false },
  ],
  times: [
    { key: 'last-24-hours', label: 'Last 24 hours', value: false },
    { key: 'last 30 days', label: 'Last 30 days', value: false, count: 1 },
    { key: 'last-7-days', label: 'Last 7 days', value: false, count: 1 },
    { key: 'anytime', label: 'Anytime', value: true, count: 3 },
  ],
};

const emptySettings = Object.freeze({
  notificationsPeriods: [],
  selectedNotificationsPeriod: null,
  productsSettings: [],
});

  // for notifications, which we will have.
const defaultSettingsData = {
  notificationsPeriods: [
    { key: '7d', label: 'Last 7 days' },
    { key: '2w', label: 'Last 2 weeks' },
  ],
  selectedNotificationsPeriod: null,
  productsSettings: [
    {
      key: 'content',
      name: 'Content',
      emailNotification: true,
      inApp: false,
    },
    {
      key: 'campaign',
      name: 'Campaign',
      emailNotification: false,
      inApp: false,
    },
  ],
};

const publishingProps = {
  publishingStatusS: () => ({
    status: PUBLISHING_STATUS,
    size: 's',
    showLabel: true,
  }),
  publishingStatusM: () => ({
    status: PUBLISHING_STATUS,
    size: 'm',
    showLabel: true,
  }),
};
*/}

// used for org switcher, which we will have later.
const items = [
  // {
  //   id: 1,
  //   email: 'fake.email@teletrex.co',
  //   organization: 'Organization A(Pod 1)',
  //   selected: true,
  // },
];

export const useProducts = (t) => {
  return [
    {
      id: 'mycompanyhome',
      href: '/',
      name: t('applicationName.mycompanyhome', 'MyCompanyAppsHome'),
    },
    {
      id: 'applicationone',
      href: '#/applicationone',
      name: t('applicationName.application.one','App One'),
      selected: true
    },
    {
      id: 'applicationtwo',
      href: '#/applicationtwo',
      name: t('applicationName.application.two','App Two'),
      selected: true
    },
]};

export const useAdminMenu = t => {
  return [
    {
      id: 'admin',
      href: '#/admin',
      name: t('applicationName.admin',"Administration"),
    }
  ]
}

const library = t =>{
  return {
    id:'library',
    href: '/library',
    name: t('header.menu.subProducts.library')
  }
}

export const useUserManagementMenu = t => {
  return [
    {
      id: 'userManagement',
      href: '#/userManagement',
      name: t('applicationName.usermgmt','User Management'),
    }
  ]
};

export const useExploreItems = (t) => {
  return [
    {
      id: 'appone',
      href: 'https://www.mycompany.com/solutions/appone/',
      name: t('applicationName.applicationone','App One'),
    },
    {
      id: 'apptwo',
      href: 'https://www.mycompany.com/solutions/apptwo/',
      name: t('applicationName.applicationone','App Two'),
    },
    {
      id: 'appthree',
      href: 'https://www.mycompany.com/solutions/appthree/',
      name: t('applicationName.applicationone','App Three'),
    },

]};

export const useUserLinks = t => {
  return [
    {
    id: 'profile',
    text: t('application.profile','Profile'),
    icon: <UserAvatar size={20} />,
    buttonProps: {
      onClick: evt => {
        location.href = '/myaccount';
      },
    },
  },
  {
    id: 'help',
    text: t('application.help','Help'),
    icon: <Help size={20} />,
    buttonProps: {
      onClick: evt => {
        console.log(evt);
        window.open('/help');
      },
    },
  },
];
}

const menuProfileProps = (user,t) => {
  const userLinks = useUserLinks(t);
  return {
  items: true ? items.slice(1, 7) : items,
  loggedUser: {
    email: user.userName || '',
    avatar: imageFile, // user.avatar when real.
    organization: user.organization,
    firstName: user.firstName || '',
    lastName: user.lastName || ''
  },
  onAddAccount: evt => {
    console.log(evt);
  },
  onLogOut: evt => {
    location.href = '/logout';
  },
  onClickItem: evt => {
    console.log(evt);
  },
  onSearchUserAccount: evt => {
    console.log(evt);
  },
  userLinks,
  headerText: '',
  enableItemsSearch: false,
}};

const menuSubProductsProps = t => ([
  {
    id: "product-management",
    name: t('header.menu.subProducts.productManagement'),
    // keep id and href value same for location detection
    subList: [{
      id: 'productGroup',
      href: '/productGroup',
      name: t('header.menu.subProducts.productGroup'),
      selected: false,
    },{
      id: 'productAttributes',
      href: '/productAttributes',
      name: t('header.menu.subProducts.productAttributes'),
      selected: false,
    },{
      id: 'productPriceCost',
      href: '/productPriceCost',
      name: t('header.menu.subProducts.productPriceCost'),
      selected: false,
    }
  ]
  },{
    id: "category-definition",
    name: t('header.menu.categoryManagement'),
    subList: [{
      id: 'categoryManager',
      href: '/categoryManager',
      name: t('header.menu.subProducts.categoryManager'),
      selected: false,
    }]
  }, {
    id: "store-management",
    name: t('header.menu.subProducts.storeManagement'),
    // keep id and href value same for location detection
    subList: [{
      id: 'locationGroup',
      href: '/locationGroup',
      name: t('header.menu.subProducts.locationGroupLibrary'),
      selected: false,
    }, {
      id: 'channels',
      href: '/channels',
      name: t('header.menu.subProducts.setChannelandDivision'),
      selected: false,
    }]
  }, {
    id: "sizeclass-definition",
    name: t('header.menu.subProducts.sizeClassSet'),
    subList: [{
      id: 'sizeclass',
      href: '/sizeclass',
      name: t('header.menu.subProducts.sizeClassDefinition'),
      selected: false,
    }]
  },{
    id: "competitor-management",
    name: t('header.menu.subProducts.competitorManagement'),
    // keep id and href value same for location detection
    subList: [{
      id: 'cpi',
      href: '/cpi',
      name: t('header.menu.subProducts.competitorPrice'),
      selected: false,
    },{
      id: 'compMapping',
      href: '/competitorMapping',
      name: t('header.menu.subProducts.competitorMapping'),
      selected: false,
    },{
      id:'setCompetitor',
      href: '/setCompetitor',
      name: t('compMapping.setCompetitor'),
      selected: false
    }]
  }]);

  const menuProductsProps = (t) => {
    const products = useProducts(t);
    const exploreItems = useExploreItems(t);
    return {
    products,
    exploreItems,
    productsTitle: t('application.menu.myproducts',"My Products"),
    exploreTitle: t('application.menu.explore', 'Explore Other Products'),
    showExploreItems: true,
    showProducts: true,
    loading: false,
    toggleBetaProps: null,
  }};


const searchProps = () => ({
  kind: 'primary',
  size: 'small',
  selectedElementCallback: () => {},
  width: 800,
});

const Recent = () => (
  <SearchGroup key="recent">
    <SearchHeader>RECENT</SearchHeader>
    <SearchElement key="recentOne" clickable>
      <SearchElementContent>Training email</SearchElementContent>
    </SearchElement>
    <SearchElement key="recentTwo" clickable>
      <SearchElementContent>Kickoff program</SearchElementContent>
    </SearchElement>
    <SearchElement key="recentThree" clickable>
      <SearchElementContent>Silver Surfer audience</SearchElementContent>
    </SearchElement>
  </SearchGroup>
);

const Insights = () => (
  <SearchGroup key="insights">
    <SearchHeader>INSIGHTS</SearchHeader>
    <SearchElement key="insightOne" clickable>
      <SearchElementContent>
        <InsightsFlag className="search-dd-story-insight" showButton={false} /> top performing
        campaigns tagged Eyewear in the last quarter
      </SearchElementContent>
    </SearchElement>
    <SearchElement key="insightTwo" clickable>
      <SearchElementContent>
        <InsightsFlag className="search-dd-story-insight" showButton={false} /> top performing
        campaigns tagged Eyewear
      </SearchElementContent>
    </SearchElement>
    <SearchElement key="insightThree" clickable>
      <SearchElementContent>
        <InsightsFlag className="search-dd-story-insight" showButton={false} /> recent campaign
        performance with goal: Engage
      </SearchElementContent>
    </SearchElement>
  </SearchGroup>
);

const HelpButton = () => (
  <SearchGroup key="help">
    <SearchHeader>HELP</SearchHeader>
    <SearchElement clickable>
      <SearchElementContent>Creating a template</SearchElementContent>
    </SearchElement>
  </SearchGroup>
);

const HeaderNavigationMenu = props => {
  const { search } = useContext(SearchContext);
  const { width } = props;

  const [selection, setSelection] = useState('review');

  const onNavSelectionChange = item => {
    setSelection(item);
  };

  return (
    <>
      {search ? (
          <SearchBar {...props} style={{width}}>
            <Recent/>
            <Insights/>
            <HelpButton/>
          </SearchBar>)
        : (
          <HeaderNavigation aria-label="Application Name">

            {
//              staticNavigation.features.map(({id, title, navigation}) => (

//              <HeaderMenuItem key={id} id={id} href={navigation.route.path}>{title}</HeaderMenuItem>
              //<HeaderMenuItem key={id} id={id} active={true} />
//                        ))
                        }
          </HeaderNavigation>
        )
      }
    </>
  );
};

HeaderNavigationMenu.propTypes = {
  width: PropTypes.number,
};

HeaderNavigationMenu.defaultProps = {
  width: 800,
};

let activationIssueTimes = 0;


const ExampleHeader = (
  { t,
    title,
    value
  }
                ) => {

  const headerService = useHeaderService();
  const [user, setUser] = useState({});
  const [isadmin, setIsadmin] = useState(false);
  const [dropDownModal, isOpenDropDownModal] = useState(false);
//  const history = useHistory();
  const [submenuProps, setSubMenuProps] = useState(menuSubProductsProps(t));
  /*
    const { ALL_PERMISSIONS, hasPermission, hasRole } = useAuthorizations();
    const canManageGeneral = hasPermission(ALL_PERMISSIONS.ADMIN_GENERAL);
    const canManageSchedule = hasPermission(ALL_PERMISSIONS.ADMIN_SCHEDULE);
    const canManageCD = hasPermission(useMISSIONS.DATA_CHANNELDIVISION);

   */
  const [menuProps, setMenuProps] = useState(menuProductsProps(t));
  const [isSideNavExpanded, setSideNavExpanded] = useState(false);

  const onClickSideNavExpand = () => {
    setSideNavExpanded(!isSideNavExpanded);
  };

  useEffect(() => {
    async function userApiCall() {
      const user = await headerService.getUserProfileApi();
      if (user) {
        const isAdmin = await headerService.getUserGroupDataApi(user.userName);
        user.isAdmin = isAdmin;
        setUser(user);
// TODO:        storeUserDetails(user);
        setIsadmin(isAdmin);

        let menuObj = cloneDeep(menuProductsProps(t));
        const adminMenu = useAdminMenu(t);
        const userManagementMenu = useUserManagementMenu(t)
        if (canManageGeneral || canManageSchedule) {
          menuObj["products"] = menuObj["products"].concat(adminMenu);
          setMenuProps(menuObj);
        }

        if (isAdmin) {
          menuObj["products"] = menuObj["products"].concat(userManagementMenu);
        }

        setMenuProps(menuObj);

        if (user.locale) {
          i18n.changeLanguage(user.locale.split('_')[0]);
        }
        let newSubMenuProps = submenuProps;
        if (!canManageCD) {
          newSubMenuProps = newSubMenuProps.map(item => {
            const subList = item.subList.filter(subListItem => subListItem.id !== 'channels');
            return {...item, subList};
          })
        }

        newSubMenuProps = newSubMenuProps.map(section => {
          if (section.id === "store-management") {
            const subList = [...section.subList, zoneGroupsLibrary(t)];
            return {...section, subList}
          }
          return section;
        })

        setSubMenuProps(newSubMenuProps);

      }
    }

//    userApiCall();
//  }, [canManageGeneral, canManageSchedule, canManageCD,hasRole]);
  }, []);


  const openDropDownModal = () => {
    console.log("inside Modal")
    dropDownModal ? isOpenDropDownModal(false) : isOpenDropDownModal(true);
  }

  const onClickDropDownLinkHandler = (id) => {
    isOpenDropDownModal(false);
    setSubMenuProps(submenuProps.map(item => {

      const subList = item.subList.map(subListItem => {
        if (subListItem.id === id) {
          return {...subListItem, selected: true}
        } else {
          return {...subListItem, selected: false};
        }
      })

      return {...item, subList};
    }));
  }


  //const { showSuccessMessage, showMessage, showErrorMessage, showWarningMessage } = useStatusMessages();
  const activationTimeout = 300000;

  const activateConnection = async () => {
    const user = await headerService.getUserProfileApi();
    if (!isEmpty(user)) {
      activationIssueTimes = 0;
      console.log("--------- connection activated -------------");
    } else {
      activationIssueTimes += 1;
      if (activationIssueTimes >= 3) {
        showWarningMessage({
          messageContent: "Server Connection is out of date, please re-login. ",
          timeout: activationTimeout, linkAction: `${location.origin}/`, linkContent: "Re Login"
        });
      }
      console.log(`--------- connection issue ${activationIssueTimes} times -------------`);
    }
  }

  useEffect(() => {
    activationIssueTimes = 0;
    const activateId = setInterval(activateConnection, activationTimeout);
    return () => {
      clearInterval(activateId);
      activationIssueTimes = 0;
    }
  }, []);

  const searchProps = () => ({
    kind: 'primary',
    size: 'small',
    selectedElementCallback: () => {},
    width: 800,
  });


  const removedReturn = () => {
    return(
  <HeaderContainer
    render={() => (
      <ThemeProvider theme={THEMES.DARK}>
        <Header aria-label="Teletrex" className={`${prefix}--ui-shell`}>
          <HeaderMenuButton
            aria-label={"Expand Menu"}
            isActive={isSideNavExpanded}
            onClick={onClickSideNavExpand}
          />
          <HeaderName prefix={null} >

            <span className="product-name-a"> Engage </span>
            <span className="product-name-b"> CX Platform </span>
          </HeaderName>
          <SearchContextProvider>
            <HeaderNavigationMenu {...searchProps()} />
            <HeaderGlobalBar>
              <SearchButtonContainer/>
              <Notifications useHeaderService={useHeaderService}/>
              <span className="user-name">{user.orgDisplay || ''}</span>
              <Profile {...menuProfileProps(user, t)} />
              <ProductsList  {...menuProps} />
            </HeaderGlobalBar>
          </SearchContextProvider>
          <SideNav aria-label="Side navigation" isRail={isSideNavExpanded} isFixedNav={!isSideNavExpanded}>
            <SideNavItems>
              <SideNavMenu
                className={`${prefix}--side-nav__side-submenu`}
                renderIcon={<Grid size={16} />}
                title="My products"
              >
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                className={`${prefix}--side-nav__side-submenu`}
                renderIcon={<Favorite size={16} />}
                title="Top Pages"
              >
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
                <SideNavMenuItem href="#/" isActive>
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavHeader renderIcon={<Fade size={16} /> }>
                <span className="short-header">CA</span>
                <span className="full-header">Campaign</span>
              </SideNavHeader>
              <SideNavLink href="#/" renderIcon={<Workspace size={16}/>}>
                Overview
              </SideNavLink>
              <SideNavLink href="#/" renderIcon={<Search size={16} />}>
                Search
              </SideNavLink>
              <SideNavMenu renderIcon={<ChartBar size={16} />} title="Reports">
                <SideNavMenuItem href="#/">Performance insights</SideNavMenuItem>
                <SideNavMenuItem href="#/">Reports center</SideNavMenuItem>
                <SideNavMenu
                  className={`${prefix}--side-nav__side-submenu`}
                  renderIcon={<ChartBar size={16} />}
                  title="Other reports"
                >
                  <SideNavMenuItem href="#/">Reports center</SideNavMenuItem>
                  <SideNavMenuItem href="#/">Single mailing</SideNavMenuItem>
                  <SideNavMenuItem href="#/">Analytics</SideNavMenuItem>
                  <SideNavMenuItem href="#/">Comparision</SideNavMenuItem>
                  <SideNavMenuItem href="#/">Multiple mailings</SideNavMenuItem>
                </SideNavMenu>
              </SideNavMenu>
              <SideNavMenu renderIcon={<TableSplit size={16} />} title="Data">
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={<Document size={16} />} title="Content">
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
                <SideNavMenuItem href="#/">Link</SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
          {/*
            <SideNav
              className="np-side-nav"
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
               <span className="product-name">Classic Pricing</span>
              <TreeNavigation>
                <TreeNavigationItem
                  label="DemandTec"
                  selected
                  handleHeadingClick={evt => {
                    location.href = '/';
                  }}
                />
                <TreeNavigationItem
                  label="Price Management"
                  handleHeadingClick={evt => {
                    location.href = '/demandtec/price/scenariomanager.dt';
                  }}
                />
                {isadmin && (
                  <TreeNavigationItem
                    label="Administration"
                    handleHeadingClick={evt => {
                      location.href = '#/admin';
                    }}
                  />
                )}
              </TreeNavigation>

            </SideNav>
             */}
          {/*            </SearchContextProvider> */}
        </Header>
      </ThemeProvider>
    )}
  />
);
}
  //return (<div>WOOFWOOWFWOOOFHeader</div>);

  return removedReturn();
};
 // TODO replace with useSelector
const mapDispatchToProps = (dispatch) => {
  return {
    storeUserDetails: payload => { dispatch(adminActions.userProfile(payload)) }
  };
};

export default ExampleHeader;



