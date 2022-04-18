
interface State {
  x: number[];
  y: number[];
};

interface Props {
};

export default class GraphContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const x = this.range(-10, 10);
    const a = 1;
    this.state = { 
      x: x, 
      y: this.calcY(x, a)
      };
  }

  range = (start: number, end: number):number[] => {
    return Array.from({ length: end - start + 1 }, (v, i) => i);
  }

  calcY = (x: number[], a: number):number[] => {
    return x.map(xx => xx*xx*a);
  }

  onCoeffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({y: this.calcY(this.state.x, parseInt(e.target.value))});
    Plotly.newPlot("graph",[{
      x: this.state.x, y: this.state.y, type: "scatter"
    }]);
  }

  componentDidMount() {
    Plotly.newPlot("graph",[{
      x: this.state.x, y: this.state.y, type: "scatter"
    }]);
  }

  render() {
    return (
      <div>
        <div id="graph"></div>
        <input type="range" min={1} max={10} step={0.1} onChange={this.onCoeffChange}/>
      </div>
    );
  }

};
