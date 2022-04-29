
import React from "react"
import {range, pi, cumtrapz} from "./math_utils"
import Plotly from "plotly.js-dist-min"

interface State {
};

interface Props {
  a: number;
};

export default class Graph2DContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  calcX = (t: number[], a: number) => {
    var dx = t.map(t => Math.cos(a*Math.sin(t))-a*Math.sin(t)*Math.sin(a*Math.sin(t)));
    return cumtrapz(t, dx);
  }

  calcY = (t: number[], a: number) => {
    var dy = t.map(t => Math.sin(a*Math.sin(t))+a*Math.sin(t)*Math.cos(a*Math.sin(t)));
    return cumtrapz(t, dy);
  }

  componentDidUpdate = () => {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = this.calcX(t, this.props.a);
    const y: number[] = this.calcY(t, this.props.a);
    const layout = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<Plotly.LayoutAxis>
      };
    Plotly.react(
      "graph_2d",
      [{x: x, y: y,
        type: "scatter", mode: "lines"
      }], layout
      );
  }

  componentDidMount() {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = this.calcX(t, this.props.a);
    const y: number[] = this.calcY(t, this.props.a);
    const layout = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<Plotly.LayoutAxis>
      };
    Plotly.newPlot(
      "graph_2d",
      [{x: x, y: y,
        type: "scatter", mode: "lines"
      }], layout
      );
  }

  render() {
    return (
      <div id="graph_2d"></div>
    );
  }
};
