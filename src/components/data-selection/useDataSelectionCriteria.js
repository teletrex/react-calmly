/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */





const useDataSelectionCriteria = () => {

  const timeframeSlices = [
    { label: 'day', value: 'day' },
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
    { label: 'quarter', value: 'quarter' },
    { label: 'half year', value: 'half year' },
    { label: 'year', value: 'year' },

  ]

  const customers = [
    { label: 'Ahold', value: 'AHOLD' },
    { label: 'CVS', value: 'CVS' },
    { label: 'Quik-E-Mart', value: 'Quik-E-Mart' },
    { label: 'Target', value: 'Target' },
    { label: 'Kroger', value: 'Kroger' },
    { label: 'Safeway', value: 'Safeway' },
  ]

  const categories = [
    { label: 'Analgesics', value: 'Analgesics' },
    { label: 'Batteries', value: 'Batteries' },
    { label: 'Cereal', value: 'Cereal' },
    { label: 'Dog Food', value: 'Dog Food' },
    { label: 'Eggs', value: 'Eggs' },
    { label: 'Frozen', value: 'Frozen' },
  ]


  const locations = [
    { label: 'West', value: 'West' },
    { label: 'East', value: 'East' },
    { label: 'South', value: 'South' },
    { label: 'North', value: 'North' },
  ]


  const criteriaConfig = {
    DEALS : {
      type: "select",
      operators : ['BY'],
      options: timeframeSlices
    },
    CUSTOMERS : {
      type: "select",
      operators : ['IS'],
      options: customers
    },
    COMPETITORS : {
      type: "select",
      operators : ['IS'],
      options: customers
    },
    LOCATIONS : {
      type: "select",
      operators : ['IS'],
      options: locations
    },
    PRODUCTS : {
      type: "select",
      operators : ['IS'],
      options: categories
    },

  }


  const criteriaDropdown = [
    {
      id: 'COMPETITORS',
      text: 'Competitors'
    },
    {
      id: 'CUSTOMERS',
      text: 'Customers'
    },
    {
      id: 'DEALS',
      text: 'Deals'
    },
    {
      id: 'PRODUCTS',
      text: 'Products'
    },
    {
      id: 'LOCATIONS',
      text: 'Locations'
    }
  ];


  return {
    criteriaConfig,
    criteriaDropdown
  }
}

export default useDataSelectionCriteria;

