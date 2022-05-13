export default function Nodes({ app, initState, onClick, onBackClick }) {
  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  app.appendChild(this.$target);

  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";
          return `
                  <div class="Node" data-node-id="${node.id}">
                      <img src="${iconPath}" />
                      <div>${node.name}</div>
                  </div>
              `;
        })
        .join("");

      console.log(this.state.isRoot);
      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="./assets/prev.png" /></div>${nodesTemplate}`
        : nodesTemplate;

      // 랜더링 후 모든 요소에 onClick 메서드 걸기
      this.$target.querySelectorAll(".Node").forEach(($node) => {
        $node.addEventListener("click", (e) => {
          // dataset으로 data-로 시작하는 속성 추출
          const { nodeId } = e.target.dataset;
          if (!nodeId) {
            this.onBackClick();
          }
          const selectedNode = this.state.nodes.find(
            (node) => node.id === nodeId
          );
          if (selectedNode) this.onClick(selectedNode);
        });
      });
    }
  };
  this.render();
}
