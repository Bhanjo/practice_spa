export default function Nodes({ app, initState, onClick, onBackClick }) {
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";

  app.appendChild(this.$element);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { nodes, isRoot } = this.state;
    this.$element.innerHTML = `
          ${
            isRoot
              ? ""
              : '<div class="Node"><img src="./assets/prev.png"></div>'
          }
          ${nodes
            .map(
              (node) =>
                `
                  <div class="Node" data-node-id="${node.id}">
                      <img src="${
                        node.type === "FILE"
                          ? "./assets/file.png"
                          : "./assets/directory.png"
                      }" />
                      <div>${node.name}</div>
                  </div>
              `
            )
            .join("")}
      `;

    this.onClick = onClick;
    this.onBackClick = onBackClick;
    const nodeClickEvent = document.querySelectorAll(".Node");
    nodeClickEvent.forEach((item) =>
      item.addEventListener("click", (e) => {
        const { nodeId } = e.target.dataset;
        console.log("선택노드id", nodeId);
        if (!nodeId) this.onBackClick();
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );
        if (selectedNode) this.onClick(selectedNode);
      })
    );
  };
  this.render();
}
