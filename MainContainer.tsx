
import React from "react"

import GraphContainer from "./GraphContainer"

interface Props {
};

export default class MainContainer extends React.Component {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div>
        <GraphContainer />
      </div>
    )
  }
};

