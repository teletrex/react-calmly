/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';

import HaloChart from '.';

let nodes = [{"color": "green", "id": "TP FLGHT NOTEBOOK STAND 1 CLGE_##_GM_STATIONERY_SCHOOL", "label": "TP FLGHT NOTEBOOK STAND 1 CLGE_##_GM_STATIONERY_SCHOOL", "shape": "dot", "title": "Product Name : TP FLGHT NOTEBOOK STAND 1 CLGE\u003cbr\u003e Product Category : GM_STATIONERY_SCHOOL\u003cbr\u003e Average Monthly Revenue : 1.89K $\u003cbr\u003e Cumulative Halo Dollar : 0.276 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "TP FLGHT NOTEBOOK STAND 1 WIDE_##_GM_STATIONERY_SCHOOL", "label": "TP FLGHT NOTEBOOK STAND 1 WIDE_##_GM_STATIONERY_SCHOOL", "shape": "dot", "title": "Product Name : TP FLGHT NOTEBOOK STAND 1 WIDE\u003cbr\u003e Product Category : GM_STATIONERY_SCHOOL\u003cbr\u003e Average Monthly Revenue : 6.23K $"}, {"color": "brown", "id": "LLOYDS   BBQ PORK_##_MEAT_HEAT_N_EAT", "label": "LLOYDS   BBQ PORK_##_MEAT_HEAT_N_EAT", "shape": "dot", "title": "Product Name : LLOYDS   BBQ PORK\u003cbr\u003e Product Category : MEAT_HEAT_N_EAT\u003cbr\u003e Average Monthly Revenue : 15.9K $\u003cbr\u003e Cumulative Halo Dollar : 0.301 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "brown", "id": "LLOYDS   BBQ BEEF_##_MEAT_HEAT_N_EAT", "label": "LLOYDS   BBQ BEEF_##_MEAT_HEAT_N_EAT", "shape": "dot", "title": "Product Name : LLOYDS   BBQ BEEF\u003cbr\u003e Product Category : MEAT_HEAT_N_EAT\u003cbr\u003e Average Monthly Revenue : 8.94K $\u003cbr\u003e Cumulative Halo Dollar : 0.331 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "brown", "id": "BARBER   CHICKEN W/BRC/CHS 10Z_##_MEAT_FROZEN_PREPARED", "label": "BARBER   CHICKEN W/BRC/CHS 10Z_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : BARBER   CHICKEN W/BRC/CHS 10Z\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 20K $\u003cbr\u003e Cumulative Halo Dollar : 0.372 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "brown", "id": "BARBER   CHICKEN CRDN BLEU 10Z_##_MEAT_FROZEN_PREPARED", "label": "BARBER   CHICKEN CRDN BLEU 10Z_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : BARBER   CHICKEN CRDN BLEU 10Z\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 25.3K $\u003cbr\u003e Cumulative Halo Dollar : 0.329 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "green", "id": "STEAKUMM SANDWICH STEAKS  9 OZ_##_MEAT_FROZEN_PREPARED", "label": "STEAKUMM SANDWICH STEAKS  9 OZ_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : STEAKUMM SANDWICH STEAKS  9 OZ\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 9.84K $\u003cbr\u003e Cumulative Halo Dollar : 0.523 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "STEAKUMM CHICKEN STEAKS 9OZ_##_MEAT_FROZEN_PREPARED", "label": "STEAKUMM CHICKEN STEAKS 9OZ_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : STEAKUMM CHICKEN STEAKS 9OZ\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 16.8K $"}, {"color": "brown", "id": "HILSHIRE KIELBASA LOOP POLSKA_##_MEAT_SAUSAGE", "label": "HILSHIRE KIELBASA LOOP POLSKA_##_MEAT_SAUSAGE", "shape": "dot", "title": "Product Name : HILSHIRE KIELBASA LOOP POLSKA\u003cbr\u003e Product Category : MEAT_SAUSAGE\u003cbr\u003e Average Monthly Revenue : 27.1K $\u003cbr\u003e Cumulative Halo Dollar : 0.315 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "brown", "id": "HILSHIRE SMOKED SAUSAGE LOOP_##_MEAT_SAUSAGE", "label": "HILSHIRE SMOKED SAUSAGE LOOP_##_MEAT_SAUSAGE", "shape": "dot", "title": "Product Name : HILSHIRE SMOKED SAUSAGE LOOP\u003cbr\u003e Product Category : MEAT_SAUSAGE\u003cbr\u003e Average Monthly Revenue : 13.4K $\u003cbr\u003e Cumulative Halo Dollar : 0.372 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "green", "id": "CAMPBELL CHICKEN NOODLE SOUP_##_MM_SOUP", "label": "CAMPBELL CHICKEN NOODLE SOUP_##_MM_SOUP", "shape": "dot", "title": "Product Name : CAMPBELL CHICKEN NOODLE SOUP\u003cbr\u003e Product Category : MM_SOUP\u003cbr\u003e Average Monthly Revenue : 2.65K $\u003cbr\u003e Cumulative Halo Dollar : 0.28 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "CAMPBELL TOMATO SOUP_##_MM_SOUP", "label": "CAMPBELL TOMATO SOUP_##_MM_SOUP", "shape": "dot", "title": "Product Name : CAMPBELL TOMATO SOUP\u003cbr\u003e Product Category : MM_SOUP\u003cbr\u003e Average Monthly Revenue : 160K $"}, {"color": "green", "id": "PEPPERS  HOT BULK AJICITO_##_FRESH_VEGETABLES", "label": "PEPPERS  HOT BULK AJICITO_##_FRESH_VEGETABLES", "shape": "dot", "title": "Product Name : PEPPERS  HOT BULK AJICITO\u003cbr\u003e Product Category : FRESH_VEGETABLES\u003cbr\u003e Average Monthly Revenue : 1.92K $\u003cbr\u003e Cumulative Halo Dollar : 0.56 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "FRIEDAS  RECAO_##_FRESH_SPECIALTY_ETHNIC", "label": "FRIEDAS  RECAO_##_FRESH_SPECIALTY_ETHNIC", "shape": "dot", "title": "Product Name : FRIEDAS  RECAO\u003cbr\u003e Product Category : FRESH_SPECIALTY_ETHNIC\u003cbr\u003e Average Monthly Revenue : 5.83K $"}, {"color": "green", "id": "KOCHS    CHK PEP JK SW CHS BCN_##_MEAT_FROZEN_PREPARED", "label": "KOCHS    CHK PEP JK SW CHS BCN_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : KOCHS    CHK PEP JK SW CHS BCN\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 8.45K $\u003cbr\u003e Cumulative Halo Dollar : 0.326 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "KOCHS    CORDON BLEU_##_MEAT_FROZEN_PREPARED", "label": "KOCHS    CORDON BLEU_##_MEAT_FROZEN_PREPARED", "shape": "dot", "title": "Product Name : KOCHS    CORDON BLEU\u003cbr\u003e Product Category : MEAT_FROZEN_PREPARED\u003cbr\u003e Average Monthly Revenue : 123K $"}, {"color": "green", "id": "BEEF     GROUND 85% PATTY FP_##_MEAT_BEEF", "label": "BEEF     GROUND 85% PATTY FP_##_MEAT_BEEF", "shape": "dot", "title": "Product Name : BEEF     GROUND 85% PATTY FP\u003cbr\u003e Product Category : MEAT_BEEF\u003cbr\u003e Average Monthly Revenue : 33.8K $\u003cbr\u003e Cumulative Halo Dollar : 0.28 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "     MLD ITL PRK SGE 10/10_##_MEAT_SAUSAGE", "label": "     MLD ITL PRK SGE 10/10_##_MEAT_SAUSAGE", "shape": "dot", "title": "Product Name :      MLD ITL PRK SGE 10/10\u003cbr\u003e Product Category : MEAT_SAUSAGE\u003cbr\u003e Average Monthly Revenue : 74.6K $"}, {"color": "green", "id": "CHOICE   BF BNLS CHK ROAST BP_##_MEAT_BEEF", "label": "CHOICE   BF BNLS CHK ROAST BP_##_MEAT_BEEF", "shape": "dot", "title": "Product Name : CHOICE   BF BNLS CHK ROAST BP\u003cbr\u003e Product Category : MEAT_BEEF\u003cbr\u003e Average Monthly Revenue : 21K $\u003cbr\u003e Cumulative Halo Dollar : 0.181 $\u003cbr\u003e Degree of Halo : 3"}, {"color": "blue", "id": "HERBS    1/2 TASTY RSTING ORG_##_FRESH_HERBS", "label": "HERBS    1/2 TASTY RSTING ORG_##_FRESH_HERBS", "shape": "dot", "title": "Product Name : HERBS    1/2 TASTY RSTING ORG\u003cbr\u003e Product Category : FRESH_HERBS\u003cbr\u003e Average Monthly Revenue : 25.1K $"}, {"color": "blue", "id": "CARROTS  WHOLE 1# CONV_##_FRESH_VEGETABLES", "label": "CARROTS  WHOLE 1# CONV_##_FRESH_VEGETABLES", "shape": "dot", "title": "Product Name : CARROTS  WHOLE 1# CONV\u003cbr\u003e Product Category : FRESH_VEGETABLES\u003cbr\u003e Average Monthly Revenue : 78.2K $"}, {"color": "blue", "id": "POTATOES C STEAMABLES RUSSET_##_FRESH_POTATOES", "label": "POTATOES C STEAMABLES RUSSET_##_FRESH_POTATOES", "shape": "dot", "title": "Product Name : POTATOES C STEAMABLES RUSSET\u003cbr\u003e Product Category : FRESH_POTATOES\u003cbr\u003e Average Monthly Revenue : 59.4K $"}, {"color": "green", "id": "LLOYDS   BBQ CHICKEN_##_MEAT_HEAT_N_EAT", "label": "LLOYDS   BBQ CHICKEN_##_MEAT_HEAT_N_EAT", "shape": "dot", "title": "Product Name : LLOYDS   BBQ CHICKEN\u003cbr\u003e Product Category : MEAT_HEAT_N_EAT\u003cbr\u003e Average Monthly Revenue : 6.33K $\u003cbr\u003e Cumulative Halo Dollar : 0.348 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "green", "id": "HILSHIRE SMOKED POLSKA LINKS_##_MEAT_SAUSAGE", "label": "HILSHIRE SMOKED POLSKA LINKS_##_MEAT_SAUSAGE", "shape": "dot", "title": "Product Name : HILSHIRE SMOKED POLSKA LINKS\u003cbr\u003e Product Category : MEAT_SAUSAGE\u003cbr\u003e Average Monthly Revenue : 9.08K $\u003cbr\u003e Cumulative Halo Dollar : 0.326 $\u003cbr\u003e Degree of Halo : 1"}, {"color": "blue", "id": "HILSHIRE CHEDDARWURST LINK SMK_##_MEAT_SAUSAGE", "label": "HILSHIRE CHEDDARWURST LINK SMK_##_MEAT_SAUSAGE", "shape": "dot", "title": "Product Name : HILSHIRE CHEDDARWURST LINK SMK\u003cbr\u003e Product Category : MEAT_SAUSAGE\u003cbr\u003e Average Monthly Revenue : 65.6K $"}];
let edges = [{"arrows": "to", "color": "#4CBB17", "from": "TP FLGHT NOTEBOOK STAND 1 CLGE_##_GM_STATIONERY_SCHOOL", "title": "Direct Halo Dollar : 0.53\u003cbr\u003e Direct Halo Unit : 0.53\u003cbr\u003e Probability of Occurance: 0.52", "to": "TP FLGHT NOTEBOOK STAND 1 WIDE_##_GM_STATIONERY_SCHOOL", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "LLOYDS   BBQ PORK_##_MEAT_HEAT_N_EAT", "title": "Direct Halo Dollar : 0.59\u003cbr\u003e Direct Halo Unit : 0.59\u003cbr\u003e Probability of Occurance: 0.51", "to": "LLOYDS   BBQ BEEF_##_MEAT_HEAT_N_EAT", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "LLOYDS   BBQ BEEF_##_MEAT_HEAT_N_EAT", "title": "Direct Halo Dollar : 0.58\u003cbr\u003e Direct Halo Unit : 0.58\u003cbr\u003e Probability of Occurance: 0.57", "to": "LLOYDS   BBQ PORK_##_MEAT_HEAT_N_EAT", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "BARBER   CHICKEN W/BRC/CHS 10Z_##_MEAT_FROZEN_PREPARED", "title": "Direct Halo Dollar : 0.63\u003cbr\u003e Direct Halo Unit : 0.63\u003cbr\u003e Probability of Occurance: 0.59", "to": "BARBER   CHICKEN CRDN BLEU 10Z_##_MEAT_FROZEN_PREPARED", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "BARBER   CHICKEN CRDN BLEU 10Z_##_MEAT_FROZEN_PREPARED", "title": "Direct Halo Dollar : 0.61\u003cbr\u003e Direct Halo Unit : 0.61\u003cbr\u003e Probability of Occurance: 0.54", "to": "BARBER   CHICKEN W/BRC/CHS 10Z_##_MEAT_FROZEN_PREPARED", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "STEAKUMM SANDWICH STEAKS  9 OZ_##_MEAT_FROZEN_PREPARED", "title": "Direct Halo Dollar : 0.63\u003cbr\u003e Direct Halo Unit : 0.66\u003cbr\u003e Probability of Occurance: 0.83", "to": "STEAKUMM CHICKEN STEAKS 9OZ_##_MEAT_FROZEN_PREPARED", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "HILSHIRE KIELBASA LOOP POLSKA_##_MEAT_SAUSAGE", "title": "Direct Halo Dollar : 0.63\u003cbr\u003e Direct Halo Unit : 0.63\u003cbr\u003e Probability of Occurance: 0.5", "to": "HILSHIRE SMOKED SAUSAGE LOOP_##_MEAT_SAUSAGE", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "HILSHIRE SMOKED SAUSAGE LOOP_##_MEAT_SAUSAGE", "title": "Direct Halo Dollar : 0.63\u003cbr\u003e Direct Halo Unit : 0.63\u003cbr\u003e Probability of Occurance: 0.59", "to": "HILSHIRE KIELBASA LOOP POLSKA_##_MEAT_SAUSAGE", "width": 8}, {"arrows": "to", "color": "#90EE90", "from": "CAMPBELL CHICKEN NOODLE SOUP_##_MM_SOUP", "title": "Direct Halo Dollar : 0.43\u003cbr\u003e Direct Halo Unit : 0.43\u003cbr\u003e Probability of Occurance: 0.65", "to": "CAMPBELL TOMATO SOUP_##_MM_SOUP", "width": 8}, {"arrows": "to", "color": "#2AAA8A", "from": "PEPPERS  HOT BULK AJICITO_##_FRESH_VEGETABLES", "title": "Direct Halo Dollar : 1.0\u003cbr\u003e Direct Halo Unit : 2.5\u003cbr\u003e Probability of Occurance: 0.56", "to": "FRIEDAS  RECAO_##_FRESH_SPECIALTY_ETHNIC", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "KOCHS    CHK PEP JK SW CHS BCN_##_MEAT_FROZEN_PREPARED", "title": "Direct Halo Dollar : 0.64\u003cbr\u003e Direct Halo Unit : 0.64\u003cbr\u003e Probability of Occurance: 0.51", "to": "KOCHS    CORDON BLEU_##_MEAT_FROZEN_PREPARED", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "BEEF     GROUND 85% PATTY FP_##_MEAT_BEEF", "title": "Direct Halo Dollar : 0.56\u003cbr\u003e Direct Halo Unit : 0.36\u003cbr\u003e Probability of Occurance: 0.5", "to": "     MLD ITL PRK SGE 10/10_##_MEAT_SAUSAGE", "width": 8}, {"arrows": "to", "color": "#90EE90", "from": "CHOICE   BF BNLS CHK ROAST BP_##_MEAT_BEEF", "title": "Direct Halo Dollar : 0.1\u003cbr\u003e Direct Halo Unit : 0.24\u003cbr\u003e Probability of Occurance: 0.51", "to": "HERBS    1/2 TASTY RSTING ORG_##_FRESH_HERBS", "width": 8}, {"arrows": "to", "color": "#90EE90", "from": "CHOICE   BF BNLS CHK ROAST BP_##_MEAT_BEEF", "title": "Direct Halo Dollar : 0.06\u003cbr\u003e Direct Halo Unit : 0.25\u003cbr\u003e Probability of Occurance: 0.61", "to": "CARROTS  WHOLE 1# CONV_##_FRESH_VEGETABLES", "width": 8}, {"arrows": "to", "color": "#90EE90", "from": "CHOICE   BF BNLS CHK ROAST BP_##_MEAT_BEEF", "title": "Direct Halo Dollar : 0.15\u003cbr\u003e Direct Halo Unit : 0.24\u003cbr\u003e Probability of Occurance: 0.62", "to": "POTATOES C STEAMABLES RUSSET_##_FRESH_POTATOES", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "LLOYDS   BBQ CHICKEN_##_MEAT_HEAT_N_EAT", "title": "Direct Halo Dollar : 0.57\u003cbr\u003e Direct Halo Unit : 0.57\u003cbr\u003e Probability of Occurance: 0.61", "to": "LLOYDS   BBQ PORK_##_MEAT_HEAT_N_EAT", "width": 8}, {"arrows": "to", "color": "#4CBB17", "from": "HILSHIRE SMOKED POLSKA LINKS_##_MEAT_SAUSAGE", "title": "Direct Halo Dollar : 0.64\u003cbr\u003e Direct Halo Unit : 0.64\u003cbr\u003e Probability of Occurance: 0.51", "to": "HILSHIRE CHEDDARWURST LINK SMK_##_MEAT_SAUSAGE", "width": 8}];

let options = {"nodes": {"size": 25, "borderWidthSelected": 1, "font": {"size": 20}}, "edges": {"color": {"inherit": false}, "smooth": {"forceDirection": "none"}}, "interaction": {"hover": true}, "physics": {"forceAtlas2Based": {"gravitationalConstant": -500, "springLength": 150, "springConstant": 0.4, "damping": 1.0, "avoidOverlap": 1.0}, "minVelocity": 30.0, "solver": "forceAtlas2Based"}};
/*
var options = {
  edges:{
    color: {inherit:false},
    smooth: {forceDirection:"none"},
    width:5
  },
  layout : {

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

 */

const convertedNodes = nodes.map(node => (
  {...node,
    title: node.title.replaceAll("\u003cbr\u003e","\n"),
    color: node.color === "green"?  "#29ab87" : node.color === "blue"? "#0292d4":node.color==="brown"?  "#d846bf":"grey"
  }
));

const convertedEdges = edges.map(edge => (
  {
    ...edge,
    title: edge.title.replaceAll("\u003cbr\u003e", "\n")
  }
//    color: edge.color === "green"?  "#29ab87" : edge.color === "blue"? "#0292d4":edge.color==="brown"?  "#d846bf":"grey" }
));


storiesOf('Charts/Halo Chart', module)
  .add('Default', () => (<div style={{height:"100vh"}}>
    <HaloChart
      edges ={convertedEdges}
      nodes = {convertedNodes}
      options={options}
      title={"Halo Effect"}
      nodeLegendLabels={[["A","Source"],["B","Destination"],["C","Both"]]}
      width={"100%"}
      height={"100%"}
    /></div>
  ))
  .add('Heirarchical Left-to-Right', () => (<div style={{height:"100vh"}}>
    <HaloChart
      edges ={convertedEdges}
      nodes = {convertedNodes}
      options ={{
        ...options,
        layout : {
          hierarchical: {
            direction: 'LR'
          }
        },
      }
      }
      title={"Halo Effect Left-to-Right"}
      nodeLegendLabels={[["A","Source"],["B","Destination"],["C","Both"]]}
    /></div>
  ))

