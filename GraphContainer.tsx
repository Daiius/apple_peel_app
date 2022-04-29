
import * as React from "react"

import Graph2DContainer from "./Graph2DContainer"
import Graph3DContainer from "./Graph3DContainer"


interface Props
{
};

interface State
{
  a: number;
};


export default class GraphContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      a: 10
    };
  }

  paramChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({a: parseInt(e.target.value)});
  }

  render() {
    return (
      <div>
        <Graph3DContainer a={this.state.a}/>
        <Graph2DContainer a={this.state.a}/>
        <input type="range" min={0} max={50} step={1} value={this.state.a} onChange={this.paramChanged}/>
      </div>
    );
  }
};
