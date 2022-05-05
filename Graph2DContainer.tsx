
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
    const {x, y} = Calc2D.calcXandY(props.a);
    const layout: Partial<Plotly.Layout> = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 }
      };
    const data: Plotly.Data[] = [{
      x: x, y: y, type: "scatter", mode: "lines"
      }];
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
