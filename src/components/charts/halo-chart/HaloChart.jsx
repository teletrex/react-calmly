/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */





import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DirectedGraphChart from "../directed-graph-chart";

const HaloChart = ({
  title,
  edges,
  nodes,
  options,
  width,
  height,
  nodeLegendLabels

}) => {

  const [legendItems, setLegendItems] = useState([]);


  useEffect( () =>
    nodeLegendLabels &&
    setLegendItems(nodeLegendLabels.map( ([key,value],index) => ({ className: '__icon-legend-'+(index+1), value:value}))
    ),[nodeLegendLabels]);


  return (
    <DirectedGraphChart
      nodes={nodes}
      edges={edges}
      options={options}
      width={width}
      title={title}
      nodeLegendLabels={nodeLegendLabels}
      height={height}
/>  );
};

HaloChart.propTypes = {
//  edges: PropTypes.arrayOf(PropTypes.object),
//  nodes: PropTypes.arrayOf(PropTypes.object),
};

HaloChart.defaultProps  = {
  edges: undefined,
  nodes: undefined,
  layout: undefined,
  width:"100%",
  height:"100%"
};

export default HaloChart;
