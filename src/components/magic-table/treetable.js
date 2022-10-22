/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



const myTreeGridMenus = { "lgc" :   // column name using the menu
    {
      items: [
        {
          label:"Mountain View",
          value:1},
        {
          label:"Shanghai",
          value:2},
        {
          label:"Pune",
          value:3}
      ]
    }
}

const myTreeGridConfig = [

  {
    "id": "name",
    "title": "Name",
    "sortable": false,
    "format": "string",
    "dataType": "String",
    "dragLock": false,
    "editorType": "string",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 230,
    "filterable": false,
    "headerKey": "name",
    "isSortable": false,
    "isEditable": true,
    "order": 1,
    "visible": true
  },
  {
    "id": "promoID",
    "title": "Promotion Id",
    "sortable": false,
    "format": "string",
    "dataType": "String",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "promoID",
    "order": 6,
    "visible": true
  },


  {
    "id": "startdate",
    "title": "Start Date (d/m/Y example Feb)",
    "sortable": false,
    "format": "date",
    "editorType" :"datebox",
    "isEditable": false,
    "dataType": "String",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "startdate",
    "order": 3,
    "visible": true,
    "editorProps" : {minDate :"08/02/2021",maxDate :"08/19/2021",dateFormat:"d/m/Y"}
  },
  {
    "id": "enddate",
    "title": "End Date (m/d/Y example Aug)",
    "sortable": false,
    "format": "date",
    "editorType" :"datebox",
    isEditable: true,
    "dataType": "String",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "enddate",
    "order": 4,
    "visible": true,
    "editorProps" : {minDate :"08/02/2021",maxDate :"08/28/2021"}
  },
  {
    "id": "lgc",
    "title": "Location Group Class",
    "sortable": false,
    "format": "string",
    "editorType" :"dropdown",
    isEditable: true,
    "dataType": "String",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "lgc",
    "order": 5,
    "visible": true
  },
  {
    "id": "id",
    "title": "ID",
    "sortable": false,
    "format": "string",
    "dataType": "String",
    "dragLock": false,
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "id",
    "order": 2,
    "visible": true
  },
  {
    "id": "rowType",
    "title": "rowType",
    "sortable": false,
    "format": "string",
    "dataType": "String",
    "defaultVisible": true,
    "requiredForUiState": false,
    "defaultWidth": 180,
    "filterable": false,
    "headerKey": "rowType",
    "order": 7,
    "visible": true
  },
];

const myTreeGridData = {
  "rows": [
    {
      "startdate": "08/02/2021",
      "enddate": "08/28/2021",
      "dateChanged": false,
      "lgcChanged": false,
      "rowType": "promotion",
      "id": "promo393",
      "name": "Test 001_Copy_1",
      "lgc": 1,
      "promoID": 393,
      "isLeaf": false,
      "level": 0,
      "expanded": true,
      "zoneGroupID": "-",
      "subRows": [{
        "startdate":  "08/02/2021",
        "enddate":   "08/28/2021",
        "dateChanged": false,
        "lgcChanged": false,
        "rowType": "promotionDetailGroup",
        "id": "pdg444",
        "name": "Regular Price REally Long Name",
        "lgc": 1,
        "promoID": "-",
        "pricingPDID": 1033,
        "isLeaf": false,
        "level": 1,
        "parent": "promo393",
        "expanded": true,
        "zoneGroupID": 2,
        "subRows": [
          {
            "startdate": "08/02/2021",
            "enddate": "08/28/2021",
            "dateChanged": false,
            "lgcChanged": false,
            "rowType": "promotionDetail",
            "id": "pd1032",
            "name": "Coupon",
            "lgc": 2,
            "promoID": "-",
            "isLeaf": true,
            "level": 2,
            "parent": "pdg444",
            "zoneGroupID": 2
          }],
      },
        {
          "startdate": "08/02/2021",
          "enddate": "08/28/2021",
          "dateChanged": false,
          "lgcChanged": false,
          "rowType": "promotionDetailGroup",
          "id": "pdg445",
          "name": "Regular Price",
          "lgc": 1,
          "promoID": "-",
          "pricingPDID": 1034,
          "isLeaf": false,
          "level": 1,
          "parent": "promo393",
          "expanded": true,
          "zoneGroupID": 2

        },
        {
          "startdate": "08/02/2021",
          "enddate": "08/28/2021",
          "dateChanged": false,
          "lgcChanged": false,
          "rowType": "promotionDetailGroup",
          "id": "pdg446",
          "name": "Regular Price",
          "lgc": 1,
          "promoID": "-",
          "pricingPDID": 1035,
          "isLeaf": false,
          "level": 1,
          "parent": "promo393",
          "expanded": true,
          "zoneGroupID": 2
        },
        {
          "startdate": "08/02/2021",
          "enddate": "08/28/2021",
          "dateChanged": false,
          "lgcChanged": false,
          "rowType": "promotionDetailGroup",
          "id": "pdg447",
          "name": "Regular Price",
          "lgc": 2,
          "promoID": "-",
          "pricingPDID": 1037,
          "isLeaf": false,
          "level": 1,
          "parent": "promo393",
          "expanded": true,
          "zoneGroupID": 2,
          "subRows": [
            {
              "startdate": "08/02/2021",
              "enddate": "08/28/2021",
              "dateChanged": false,
              "lgcChanged": false,
              "rowType": "promotionDetail",
              "id": "pd1036",
              "name": "Display",
              "lgc": 3,
              "promoID": "-",
              "isLeaf": true,
              "level": 2,
              "parent": "pdg447",
              "zoneGroupID": 2
            }
          ],

        }]
    },
    {
      "startdate": "08/02/2021",
      "enddate": "08/28/2021",
      "dateChanged": false,
      "lgcChanged": false,
      "rowType": "promotion",
      "id": "promo512",
      "name": "Test 003",
      "lgc": -1,
      "promoID": 512,
      "isLeaf": false,
      "level": 0,
      "expanded": true,
      "zoneGroupID": "-"
    }
  ]
}
export {myTreeGridData, myTreeGridConfig,myTreeGridMenus};
