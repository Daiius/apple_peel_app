
import React, { useState } from "react"

import Graph2DContainer from "./Graph2DContainer"
import Graph3DContainer from "./Graph3DContainer"

import classes from "./styles.module.css"

interface Props
{
};

export const GraphContainer = (props: Props) => {
  
  const [a, setA] = useState(10);

  const paramChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setA(parseInt(e.target.value));
  }

  return (
    <div>
      <div className={classes.graphContainer}>
        <Graph3DContainer a={a}/>
        <Graph2DContainer a={a}/>
      </div>
      <input type="range" min={0} max={50} step={1} value={a} 
             onChange={paramChanged}/>
    </div>
    );
};
