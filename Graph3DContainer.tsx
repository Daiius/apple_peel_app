
import React, { useState, useEffect } from "react"
import Plotly from "plotly.js-dist-min"
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

    const layout: Partial<Plotly.Layout> = { 
      autosize: false, width: 500, height: 500,
      xaxis: { autorange: false, range: [-0.5, +0.5] },
      yaxis: { scaleanchor: "x", scaleratio: 1.0 },
      showlegend: false
      };
    const data: Plotly.Data[] = [
      {x: ps.x, y: ps.y, z: ps.z, type: "scatter3d", mode: "lines"},
      {x:  p.x, y:  p.y, z:  p.z, type: "scatter3d", marker: { size: 5 } }
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

