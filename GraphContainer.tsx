
import React, { useState } from "react"

import { Graph2DContainer } from "./Graph2DContainer"
import { Graph3DContainer } from "./Graph3DContainer"

import classes from "./styles.module.css"

export const GraphContainer = () => {
  
  const [a, setA] = useState(10);
  const [t, setT] = useState(0.0);

  const paramAChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setA(parseInt(e.target.value));
  }

  const paramTChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setT(parseFloat(e.target.value));
  }

  return (
    <div>
      <div className={classes.graphContainer}>
        <Graph3DContainer a={a} t={t}/>
        <Graph2DContainer a={a} t={t}/>
      </div>
      <p>param. a: {a}</p>
      <input className={classes.slider} type="range" min={0} max={50} step={1} value={a} 
             onChange={paramAChanged}/>
      <p>param. t: {t}</p>
      <input className={classes.slider} type="range" min={0} max={3.14} step={0.001} value={t}
             onChange={paramTChanged}/>
    </div>
    );
};
