
import React, { useState, useEffect } from "react"
import {range, pi, cumtrapz, shiftToCenter, rotateToHorizontal} from "./math_utils"
import Plotly from "plotly.js-dist-min"
import classes from "./styles.module.css"

type Props = {
  a: number;
};

export const Graph2DContainer = (props: Props) => {

  const calcX = (t: number[], a: number) => {
    var dx = t.map(t => Math.cos(a*Math.sin(t))-a*Math.sin(t)*Math.sin(a*Math.sin(t)));
    return cumtrapz(t, dx);
  }

  const calcY = (t: number[], a: number) => {
    var dy = t.map(t => Math.sin(a*Math.sin(t))+a*Math.sin(t)*Math.cos(a*Math.sin(t)));
    return cumtrapz(t, dy);
  }
  
  const [isPlotted, setIsPlotted] = useState(false);

  useEffect(() => {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = calcX(t, props.a);
    const y: number[] = calcY(t, props.a);
    const pos_shifted = shiftToCenter({x, y});
    const pos_rotated = rotateToHorizontal(pos_shifted);
    const layout = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<Plotly.LayoutAxis>
      };
    if (isPlotted) {
      Plotly.react(
       "graph_2d",
       [{x: pos_rotated.x, y: pos_rotated.y,
         type: "scatter", mode: "lines"
       }], layout
       );
    } else {
      Plotly.newPlot(
        "graph_2d",
        [{x: pos_rotated.x, y: pos_rotated.y,
          type: "scatter", mode: "lines"
        }], layout
        );
       setIsPlotted(true);
    }
  });

  return (
    <div id="graph_2d" className={classes.graph}></div>
    );
};
