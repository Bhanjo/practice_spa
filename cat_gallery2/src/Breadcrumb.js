export default function Breadcrumb({ app, initState }) {
  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";

  app.appendChild(this.$element);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `<div class="nav-item">root</div>${this.state
      .map((item) => `<div class="nav-item">${item.name}</div>`)
      .join("")}`;
  };
  this.render();
}
