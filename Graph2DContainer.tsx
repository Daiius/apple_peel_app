
import React, { useState, useEffect } from "react"
import Plotly from "plotly.js-dist-min"
import classes from "./styles.module.css"

import * as Calc2D from "./graph_2d_calcs"

type Props = {
  a: number;
  t: number;
};

export const Graph2DContainer = (props: Props) => {

  
  const [isPlotted, setIsPlotted] = useState(false);

  useEffect(() => {
    const {shift, theta, points} = Calc2D.calcXandY(props.a);
    const p = Calc2D.calcSpecifiedPoint(props.t, props.a, shift, theta);
    const layout: Partial<Plotly.Layout> = {
      autosize: false, width:  500, height: 500,
      xaxis: { 
        autorange: false, 
        range: [Math.min(...points.x) * 1.1, Math.max(...points.x) * 1.1]
        },
      yaxis: { scaleanchor: "x", scaleratio: 1.0 },
      showlegend: false
      };
    const data: Plotly.Data[] = [
      {x: points.x, y: points.y, type: "scatter", mode: "lines"},
      {x: p.x, y: p.y, type: "scatter", marker: { size: 10 } }
      ];
    if (isPlotted) {
      Plotly.react("graph_2d", data, layout);
    } else {
      Plotly.newPlot("graph_2d", data, layout);
      setIsPlotted(true);
    }
  });

  return (
    <div id="graph_2d" className={classes.graph}></div>
    );
};

