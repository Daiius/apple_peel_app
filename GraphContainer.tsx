
interface State {
  x: [number];
  y: [number];
};

interface Props {
};

export default class GraphContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const x = this.range(-10, 10);
    const a = 1;
    this.state = {
      a: a, 
      x: x, 
      y: this.calcY(x, a)
      };
  }

  range = (start, end) => {
    return Array(end - start + step).fill().map((_,idx) => start + idx)
  }

  calcY = (x: [number], a: number) => {
    return x.map(xx => xx*xx*a);
  }

  onCoeffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({y: calcY(this.state.x, e.target.value)});
  }

  render() {
    return (
      <div>
        <PlotlyChart data={data}/>
        <input type="range" min={1} max={10} step={0.1}/>
      </div>
    );
  }

};
