/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */


const workspaceDataJson = {
  title : "Welcome",
  id:"0442-2224-2223-6262",
  template: "overview",
  widgets: [
    {
      id: "a",
      definitionId: "weekly-activity-tracker"
    },
    {
      id: "b",
      definitionId: "executive-summary",
    },
    {
      id: "c",
      definitionId: "deals-by-week"
    },
    {
      id: "d",
      definitionId: "sales-by-week"
    },
    {
      id: "e",
      definitionId: "promotion-effectiveness"
    },
    {
      id: "f",
      definitionId: "campaign-success"
    },
    {
      id: "g",
      definitionId: "journey-map-path-to-purchase"
    }
  ],
  layouts: {
    lg: [
      {i: 'a', x:0, y:0,w:2,h:6,static:true},
      {i: 'b', x:2,y:0,h:2,w:6},
      {i: 'c', x: 2, y: 0, w: 3, h: 2},
      {i: 'd', x: 5, y: 0, w: 3, h: 2},
      {i: 'e', x: 2, y: 0, w: 3, h: 2},
      {i: 'f', x: 5, y: 0, w: 3, h: 2},
      {i: 'g', x: 0, y: 4, w: 8, h: 3},
    ],
    md: [
      {i: 'a', x:0, y:0,w:2,h:8},
      {i: 'b', x:0,y:0,h:4,w:4},
      {i: 'c', x: 0, y: 0, w: 1, h: 1},
      {i: 'd', x: 2, y: 0, w: 1, h: 1},
      {i: 'e', x: 0, y: 1, w: 1, h: 1},
      {i: 'f', x: 2, y: 1, w: 1, h: 1},
      {i: 'g', x: 4, y: 4, w: 4, h: 3},
    ]
  }
}

export default workspaceDataJson;
