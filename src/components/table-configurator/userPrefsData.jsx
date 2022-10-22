/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */





const gridData = {


  data: {
    rows: [{
      "id": "1",
      "upc": 1,
      "desc": "Alpha",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }, {
      "id": "2",
      "upc": 2,
      "desc": "Beta Text",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }, {
      "id": "3",
      "upc": 3,
      "desc": "Gamma Text",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }, {
      "id": "4",
      "upc": 4,
      "desc": "Description Text",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }, {
      "id": "5",
      "upc": 5,
      "desc": "Description Text",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }, {
      "id": "6",
      "upc": 6,
      "desc": "Description Text",
      "status": "Price Change",
      "currprice": 4.99,
      "currmargin": 0.13,
      "currrevenue": 55242,
      "newprice": 4.32,
      "overrideprice": -1,
      "newmargin": 0.12
    }],
    total: 6
  }
}


export default gridData;




// -----------------------------------------------

export const initialConfig_2 = Object.freeze([
  {
    renderHeader: () => 'Name',
    renderCol: item => item.name,
    id: 'name',
    headerKey: 'name',
    isSortable: true,
  },
  {
    renderHeader: () => 'Port',
    renderCol: item => item.port,
    id: 'port',
    headerKey: 'port',
    isSortable: true,
  },
  {
    renderHeader: () => 'Rule',
    renderCol: item => item.rule,
    id: 'rule',
    headerKey: 'rule',
    isSortable: true,
  },
  {
    renderHeader: () => 'Attached Groups',
    renderCol: item => item.attached_groups,
    id: 'attached_groups',
    headerKey: 'attached_groups',
    isSortable: true,
  },
  {
    renderHeader: () => 'Status',
    renderCol: item => item.status,
    id: 'status',
    headerKey: 'status',
    isSortable: true,
  },
]);

export const initialRows_2 = [{
  id: 'a',
  name: 'Load Balancer 3',
  protocol: 'HTTP',
  port: 3000,
  rule: 'Round robin',
  attached_groups: 'Kevins VM Groups',
  status: 'Disabled'
}, {
  id: 'b',
  name: 'Load Balancer 1',
  protocol: 'HTTP',
  port: 443,
  rule: 'Round robin',
  attached_groups: 'Maureens VM Groups',
  status: 'Starting'
}, {
  id: 'c',
  name: 'Load Balancer 2',
  protocol: 'HTTP',
  port: 80,
  rule: 'DNS delegation',
  attached_groups: 'Andrews VM Groups',
  status: 'Active'
}, {
  id: 'd',
  name: 'Load Balancer 6',
  protocol: 'HTTP',
  port: 3000,
  rule: 'Round robin',
  attached_groups: 'Marcs VM Groups',
  status: 'Disabled'
}, {
  id: 'e',
  name: 'Load Balancer 4',
  protocol: 'HTTP',
  port: 443,
  rule: 'Round robin',
  attached_groups: 'Mels VM Groups',
  status: 'Starting'
}, {
  id: 'f',
  name: 'Load Balancer 5',
  protocol: 'HTTP',
  port: 80,
  rule: 'DNS delegation',
  attached_groups: 'Ronjas VM Groups',
  status: 'Active'
}];

export const headers_2 = [{
  key: 'name',
  header: 'Name'
}, {
  key: 'protocol',
  header: 'Protocol'
}, {
  key: 'port',
  header: 'Port'
}, {
  key: 'rule',
  header: 'Rule'
}, {
  key: 'attached_groups',
  header: 'Attached Groups'
}, {
  key: 'status',
  header: 'Status'
}];
