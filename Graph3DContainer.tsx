
import React, { useState, useEffect } from "react"
import {pi, range} from "./math_utils"
import Plotly from "plotly.js-dist-min"
import classes from "./styles.module.css"

type Props = {
  a: number;
};

export const Graph3DContainer = (props: Props) => {

  const calcX = (t: number[], a: number): number[] => {
    return t.map(t => Math.sin(t) * Math.cos(a*t));
  }
  const calcY = (t: number[], a: number):number[] => {
    return t.map(t => Math.sin(t) * Math.sin(a*t));
  }
  const calcZ = (t: number[], a: number): number[] => {
    return t.map(t => Math.cos(t));
  }

  const [isPlotted, setIsPlotted] = useState(false);

  useEffect(() => {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = calcX(t, props.a);
    const y: number[] = calcY(t, props.a);
    const z: number[] = calcZ(t, props.a);

    const layout = { 
      autosize: true,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<Plotly.LayoutAxis>,
      zaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<Plotly.LayoutAxis>
      };

    if (isPlotted) {
      Plotly.react(
       "graph_3d",
       [{x: x, y: y, z: z,
         type: "scatter3d", mode: "lines"
       }], layout
       );
    } else {
      Plotly.newPlot(
       "graph_3d",
       [{x: x, y: y, z: z,
         type: "scatter3d", mode: "lines"
       }], layout
       );
       setIsPlotted(true);
    }
    
  });

  return (
    <div id="graph_3d" className={classes.graph}></div>
    );
};

