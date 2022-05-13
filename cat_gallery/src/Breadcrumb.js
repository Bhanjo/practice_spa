export default function Breadcrumb(app, initState) {
  // console.log(app.app);
  this.state = initState;
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  app.app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" data-index="${index}">${node.name}</div>`
      )
      .join("")}`;
  };
}
