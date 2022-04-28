
import {range, pi, cumtrapz} from "./math_utils"

import {react, newPlot, LayoutAxis} from "plotly.js"

interface State {
  t: number[];
  x: number[];
  y: number[];
};

interface Props {
};

export default class Graph2DContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const t = range(0, pi, 1e-2);
    const a = 10;

    this.state = {
      t: t,
      x: this.calcX(t, a),
      y: this.calcY(t, a),
    };
  }

  calcX = (t: number[], a: number) => {
    var dx = t.map(t => Math.cos(a*Math.sin(t))-a*Math.sin(t)*Math.sin(a*Math.sin(t)));
    return cumtrapz(t, dx);
  }

  calcY = (t: number[], a: number) => {
    var dy = t.map(t => Math.sin(a*Math.sin(t))+a*Math.sin(t)*Math.cos(a*Math.sin(t)));
    return cumtrapz(t, dy);
  }

  onCoeffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = parseInt(e.target.value);
    this.setState({
      x: this.calcX(this.state.t, a),
      y: this.calcY(this.state.t, a),
      });
    const layout = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<LayoutAxis>
      };
    Plotly.react(
      "graph_2d",
      [{x: this.state.x, y: this.state.y,
        type: "scatter", mode: "lines"
      }], layout
      );
  }

  componentDidMount() {
    const layout = {
      autosize: true, width:  500, height: 500,
      yaxis: { scaleanchor: "x", scaleratio: 1.0 } as Partial<LayoutAxis>
      };
    Plotly.newPlot(
      "graph_2d",
      [{x: this.state.x, y: this.state.y,
        type: "scatter", mode: "lines"
      }], layout
      );
  }

  render() {
    return (
      <div>
        <div id="graph_2d"></div>
        <input type="range" min={0} max={30} step={0.1} defaultValue={10} onChange={this.onCoeffChange}/>
        
      </div>
    );
  }
};
