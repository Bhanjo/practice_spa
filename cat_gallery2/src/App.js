import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

import fetchData from "./api.js";
import ImageViewer from "./ImageViewer.js";

export default function App(app) {
  this.state = {
    depth: [],
    nodeList: [],
    isRoot: true,
    selectedFilePath: null,
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    // console.log(this.state.depth);
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      nodes: this.state.nodeList,
      isRoot: this.state.isRoot,
    });
    imageViewer.setState(this.state.selectedFilePath);
  };

  const breadcrumb = new Breadcrumb({
    app: app,
    initState: this.state.depth,
  });

  const onClickNode = async (node) => {
    if (node.type === "DIRECTORY") {
      const nextData = await fetchData(node.id);
      this.setState({
        ...this.setState,
        depth: [...this.state.depth, node],
        nodeList: nextData,
        isRoot: false,
      });
    } else if (node.type === "FILE") {
      this.setState({
        ...this.state,
        isRoot: false,
        selectedFilePath: node.filePath,
      });
    }
  };
  const onBackClick = async () => {
    const prevState = { ...this.state };
    prevState.depth.pop();
    const prevNode = this.state.depth[prevState.depth.length - 1];
    const prevNodeId = prevNode.id;
    console.log("이전노드", prevNode);
    if (prevNode === "root") {
      const nextData = await fetchData();
      this.setState({
        ...this.state,
        depth: [],
        nodeList: nextData,
        isRoot: true,
      });
    } else {
      const nextData = await fetchData(prevNodeId);
      console.log(prevNodeId, nextData);
      this.setState({
        ...this.state,
        depth: prevState,
        nodeList: nextData,
        isRoot: false,
      });
    }
  };
  const nodes = new Nodes({
    app: app,
    initState: {
      nodes: this.state.nodeList,
      isRoot: this.state.isRoot,
    },
    onClick: onClickNode,
    onBackClick: onBackClick,
  });

  const imageViewer = new ImageViewer({
    app: app,
    initState: this.state.selectedFilePath,
  });

  const init = async () => {
    const datas = await fetchData();
    this.setState({
      ...this.state,
      nodeList: datas,
    });
  };
  init();
}
