/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */




import React from 'react';
import PropTypes from 'prop-types/prop-types';
import Legend from '../charts/components/Legend';





const RingChart = props => {
  const {
    width,
    height,
    data, // list of { label: string, value: number, color: Csscolor}
    maxValue,
    centerText,
  } = props;

// TODO: Feed the legend items in. data.map blah blah blah.
  return (
    <div>

      <Legend items={
        data.map((legend, index) => (
          {
            className:("__icon-legend-" + (index + 1)),
            value: legend.label + " (" + legend.value + ")"
        })
        )}
      />

      <div className="activity-ring-chart" style={{"position":"relative","width":width,"height":height}} >

        <svg height={height} width={width} viewBox={"0 0 200 200"}>
        <g >
          { data && data.map ((datum,index) => {
              const radius = 40 + 20 * index;
              const circumference = radius * 2 * 3.1415926;
              const dasharrayLength = datum.value / maxValue * circumference;
              return (
                <circle
                  key={"legend-"+(index+1)}
                  className={"legend-"+(index+1)}
                  fill="none"
                  strokeLinecap="round"
                  cx="50%" cy="50%"
                  strokeWidth="15"
                  r={radius}
                  strokeDasharray={dasharrayLength + ", " + circumference}/>
              )
            }
          )
          }
        </g>
      </svg>
        <div style={
          {
            "position":"absolute",
            "display":"grid",
            "top":'0',
            "left":'0',
            "textAlign":"center",
            "alignItems":"center",
            "width":width,
            "height":height,
            "fontWeight":"bold",
            "fontSize":"1.3rem"
          }
        }

        >{centerText}
        </div>
      </div>
    </div>

  )
}

RingChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    color: PropTypes.string
  })).isRequired,
  maxValue: PropTypes.number.isRequired,
  centerText: PropTypes.string
};

RingChart.defaultProps = {
  width:"100%",
  height:"100%",
  data:  [
    {
      value: 900,
      label:"Deals in process",
    },
    {
      value: 864,
      label:"Deals to approve",
    },
    {
      value: 423,
      label:"Deals proposed",
    }
  ],
  maxValue:1000,
  centerText:" "
};

export default RingChart;

