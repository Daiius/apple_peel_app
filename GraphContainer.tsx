
interface State {
  t: number[];
  x: number[];
  y: number[];
  z: number[];
};

interface Props {
};

export default class GraphContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const pi = 3.14159265358979;
    const t = this.range(0, pi, 1e-2);
    const a = 10;
    this.state = {
      t: t,
      x: this.calcX(t, a), 
      y: this.calcY(t, a),
      z: this.calcZ(t, a)
      };
  }

  range = (start: number, end: number, step: number):number[] => {
    return Array.from({ length: (end - start)/step }, (v, i) => start + i*step);
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

  onCoeffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = parseInt(e.target.value);
    this.setState({
      x: this.calcX(this.state.t, a),
      y: this.calcY(this.state.t, a),
      z: this.calcZ(this.state.t, a)
      });
    const layout = {
      autosize: false,
      width:  1,
      height: 1,
      };
    Plotly.newPlot(
      "graph",
      [{
        x: this.state.x, 
        y: this.state.y,
        z: this.state.z,
        type: "scatter3d",
        mode: "lines"
      }], 
      layout
      );
  }

  componentDidMount() {
    const layout = {
      autosize: false,
      width:  1,
      height: 1,
      };
    Plotly.newPlot(
      "graph",
      [{
        x: this.state.x, 
        y: this.state.y,
        z: this.state.z,
        type: "scatter3d",
        mode: "lines"
      }],
      layout
      );
  }

  render() {
    return (
      <div>
        <div id="graph"></div>
        <input type="range" min={0} max={30} step={0.1} defaultValue={10} onChange={this.onCoeffChange}/>
      </div>
    );
  }

};
