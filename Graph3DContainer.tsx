
import React, { useState, useEffect } from "react"

import Plotly from "plotly.js-dist-min"
// using module augmentation to add color property in PlotData
declare module "plotly.js-dist-min" {
  interface PlotData {
    color: string;
  }
}

import classes from "./styles.module.css"

import * as Calc3D from "./graph_3d_calcs"

type Props = {
  a: number;
  t: number;
};

export const Graph3DContainer = (props: Props) => {


  const [isPlotted, setIsPlotted] = useState(false);

  useEffect(() => {

    const ps = Calc3D.calcXandYandZ(props.a);
    const p = Calc3D.calcSpecifiedPoint(props.a, props.t);

    const sphere1 = Calc3D.calcSphereMesh("upper");
    const sphere2 = Calc3D.calcSphereMesh("lower");

    const layout: Partial<Plotly.Layout> = { 
      autosize: false, width: 500, height: 500,
      xaxis: { autorange: false, range: [-0.5, +0.5] },
      yaxis: { scaleanchor: "x", scaleratio: 1.0 },
      showlegend: false
      };
    const data: Plotly.Data[] = [
      {x:      ps.x, y:      ps.y, z:      ps.z, type: "scatter3d", 
       mode: "lines", line: { width: 5, color: "rgb(128, 255, 255)"} },
      {x:       p.x, y:       p.y, z:       p.z, type: "scatter3d", 
       marker: { size: 5 } },
      {x: sphere1.x, y: sphere1.y, z: sphere1.z, type: "mesh3d", 
       opacity: 0.3, color: "rgb(255,0,0)" },
      {x: sphere2.x, y: sphere2.y, z: sphere2.z, type: "mesh3d", 
       opacity: 0.3, color: "rgb(255,0,0)" },
      ];

    if (isPlotted) {
      Plotly.react("graph_3d", data, layout);
    } else {
      Plotly.newPlot("graph_3d", data, layout);
      setIsPlotted(true);
    }
    
  });

  return (
    <div id="graph_3d" className={classes.graph}></div>
    );
};

