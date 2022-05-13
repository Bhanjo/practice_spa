import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

import req from "./api.js";
import ImageView from "./ImageView.js";

export default function App(app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const breadcrumb = new Breadcrumb({
    app,
    initState: this.state.depth,
  });

  const nodes = new Nodes({
    app,
    initState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      console.log("onClick Event");
      try {
        if (node.type === "DIRECTORY") {
          const nextNodes = await req(node.id);
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            isRoot: false,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        throw new Error(`onClick에 대한 에러 ${e.message}`);
      }
    },
    onBackClick: async () => {
      console.log("onBackClick Event");
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          const rootNodes = await req();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await req(prevNodeId);
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (e) {
        throw new Error(`onBackClick 패치 잘못됨 ${e.message}`);
      }
    },
  });

  const imageView = new ImageView({
    app,
    initState: this.state.selectedNodeImage, // ????? 오타?
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
  };

  const init = async () => {
    const rootNodes = await req();
    console.log(rootNodes);
    this.setState({
      ...this.state,
      isRoot: true,
      nodes: rootNodes,
    });
  };
  init();
}
