/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */





import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Network} from 'vis-network/standalone';
import Legend from "../components/Legend";

const DirectedGraphChart = ({
  title,
  edges,
  nodes,
  options,
  width,
  height,
  nodeLegendLabels

}) => {

  const [edgesDataSet, setEdgesDataSet] = useState([]);
  const [nodesDataSet, setNodesDataSet] = useState([]);
  const networkRef = useRef();

  const [legendItems, setLegendItems] = useState([]);

  const groupColors = [
    "#29ab87",
    "#0292d4",
    "#d846bf",
    "#f45d20",
    "#f3ba00",
    "#ff465a",
    "#ff8c7b"
  ]

  const groupColoring = {
    "_legendA":{color:{background:groupColors[0]}},
    "_legendB":{color:{background:groupColors[1]}},
    "_legendC":{color:{background:groupColors[2]}},
    "_legendD":{color:{background:groupColors[3]}},
    "_legendE":{color:{background:groupColors[4]}},
    "_legendF":{color:{background:groupColors[5]}},
    "_legendG":{color:{background:groupColors[6]}}
  }

  useEffect( () =>
    nodeLegendLabels &&
    setLegendItems(nodeLegendLabels.map( ([key,value],index) => ({ className: '__icon-legend-'+(index+1), value:value}))
    ),[nodeLegendLabels]);

  /* https://visjs.github.io/vis-network/docs/network/ */
  useEffect( () => {
    const network = networkRef.current && new Network(networkRef.current,
      {
        edges,
        nodes,
        options : {
          ...options,
          groups : {
            ...options.groups,
            ...groupColoring
          },
        }
      },{});
  }, [networkRef, edgesDataSet,nodesDataSet]);

  return (
    <div className={"bx--eleven-chart"} style={{"width":width,"height":height}}>
      <div className={"bx--eleven-chart__header"}>{title}</div>
      <Legend items={legendItems} />
      <div className={"bx--eleven-chart__chart"}
        ref={networkRef}
        id="thisNetwork"
        style={{"height":"100%"}}>
      </div>
    </div>
  );
};

DirectedGraphChart.propTypes = {
//  edges: PropTypes.arrayOf(PropTypes.object),
//  nodes: PropTypes.arrayOf(PropTypes.object),
};

DirectedGraphChart.defaultProps  = {
  edges: undefined,
  nodes: undefined,
  layout: undefined,
  width:"100%",
  height:"100%"
};

export default DirectedGraphChart;
