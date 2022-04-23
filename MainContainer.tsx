
import Graph3DContainer from "./Graph3DContainer"

interface Props {
};

export default class MainContainer extends React.Component {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div>
        Hello, This is a interactive graph content.
        <Graph3DContainer />
      </div>
    )
  }
};

