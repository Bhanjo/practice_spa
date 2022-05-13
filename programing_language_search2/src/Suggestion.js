export default function Suggestion({ app, initState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  this.state = {
    items: initState.items,
    selectIndex: 0,
  };

  app.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  window.addEventListener("keyup", (e) => {
    let nextIndex = this.state.selectIndex;
    if (e.key === "ArrowUp") {
      nextIndex =
        this.state.selectIndex === 0
          ? this.state.items.length - 1
          : nextIndex - 1;
    } else if (e.key === "ArrowDown") {
      nextIndex =
        this.state.selectIndex === this.state.items.length - 1
          ? 0
          : nextIndex + 1;
    } else if (e.key === "Enter") {
      onSelect(this.state.selectIndex);
    }
    this.setState({
      ...this.state,
      selectIndex: nextIndex,
    });
  });

  this.$element.addEventListener("click", (e) => {
    const { index } = e.target.dataset;
    onSelect(index);
  });

  this.render = () => {
    const items = this.state.items;
    if (items.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
              <ul>
                  ${items
                    .map(
                      (item, index) => `
                      <li class="${
                        index === this.state.selectIndex
                          ? "Suggestion__item--selected"
                          : ""
                      }" data-index="${index}">${item}</li>
                  `
                    )
                    .join("")}
              </ul>
          `;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  this.render();
}
