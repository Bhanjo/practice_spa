export default function SelectList({ app, initState }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  app.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
          <ul>
              ${this.state
                .map(
                  (item) =>
                    `
                      <li>
                          ${item}
                      </li>
                  `
                )
                .join("")}
          </ul>
      `;
  };
  this.render();
}
