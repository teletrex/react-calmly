/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';

import DirectedGraphChart from '.';


// create an array with edges
var edges = [
  { from: 1, to: 3 ,arrows:"to",label:"     loves"},
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
  { from: 6, to: 7}
];
var nodes = [
  { id: 1, label: "Node 1", group :"_legendB" , x:100,y:100 },
  { id: 2, label: "Node 2" , group :"_legendA",x:50,y:50 },
  { id: 3, label: "Node 3" , group : "_legendA",x:75,y:75 },
  { id: 4, label: "Node 4" , group : "_legendB"},
  { id: 5, label: "Node 5" , group : "_legendC"},
  { id: 6, label: "Node 6" , group : "_legendD"},
  { id: 7, label: "Node 7" , group : "_legendE"},
];


var options = {
  edges:{
    color: {inherit:false},
    smooth: {forceDirection:"none"},
    width:5,
  },

  groups: {
    A: { color:{background:"red"}},
    B: { color:{background:"blue"}}
  },
  nodes: {
    borderWidth : 0,
    borderWidthSelected:1,
    font:{size:20},
    shape:"dot",
    size:25
  },

  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -500,
      springLength: 150,
      springConstant: 0.4,
      damping: 1.0,
      avoidOverlap: 1.0
    },
    minVelocity: 30.0,
    solver: "forceAtlas2Based"
  },
  interaction:{hover:true},
  autoResize:true
};

storiesOf('Charts/Directed Graph Chart', module)
  .add('Default', () => (<div style={{height:"100vh"}}>
    <DirectedGraphChart
      edges ={edges}
      nodes = {nodes}
      options={options}
      title={"Force Directed Graph"}
      nodeLegendLabels={[["A","Source"],["B","Destination"],["C","Both"]]}
    /></div>
  ))
  .add('Hierarchical Chart', () => ( (<div style={{height:"100vh"}}>
      <DirectedGraphChart
        edges ={edges}
        nodes = {nodes}
        title={"Hierarchical Left-to-Right Force Directed Graph"}
        nodeLegendLabels={[["A","Source"],["B","Destination"],["C","Both"]]}
        options ={{
          ...options,
          layout : {
            hierarchical: {
              direction: 'LR'
            }
          },
        }
        }
      /></div>
  )))
  .add('No Edges, No Physics', () => ( (<div style={{height:"100vh"}}>
    <DirectedGraphChart
      edges ={edges}
      nodes = {nodes}
      title={"No Edges, No Physics"}
      nodeLegendLabels={[["A","Source"],["B","Destination"],["C","Both"]]}
      options ={{
        ...options,
        edges : {
          ...options.edges,
          hidden:true
        },
        physics:false,

      }
      }
    /></div>
)));

