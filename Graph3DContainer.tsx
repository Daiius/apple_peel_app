
import React from "react"
import {pi, range} from "./math_utils"
import Plotly from "plotly.js-dist-min"

interface State {
};

interface Props {
  a: number;
};

export default class Graph3DContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  calcX = (t: number[], a: number): number[] => {
    return t.map(t => Math.sin(t) * Math.cos(a*t));
  }
  calcY = (t: number[], a: number):number[] => {
    return t.map(t => Math.sin(t) * Math.sin(a*t));
  }
  calcZ = (t: number[], a: number): number[] => {
    return t.map(t => Math.cos(t));
  }

  componentDidUpdate = () => {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = this.calcX(t, this.props.a);
    const y: number[] = this.calcY(t, this.props.a);
    const z: number[] = this.calcZ(t, this.props.a);

    const layout = { autosize: false, width:  500, height: 500 };
    Plotly.react(
      "graph_3d",
      [{x: x, y: y, z: z,
        type: "scatter3d", mode: "lines"
      }], layout
      );
  }

  componentDidMount() {
    const t: number[] = range(0, pi, 0.001);
    const x: number[] = this.calcX(t, this.props.a);
    const y: number[] = this.calcY(t, this.props.a);
    const z: number[] = this.calcZ(t, this.props.a);
    const layout = { autosize: false, width:  500, height: 500 };
    Plotly.newPlot(
      "graph_3d",
      [{x: x, y: y, z: z,
        type: "scatter3d", mode: "lines"
      }], layout
      );
  }

  render() {
    return (
      <div id="graph_3d"></div>
    );
  }
};

