export default function SearchInput({ app, initState, onChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initState;
  app.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">`;
  };

  this.render();

  const ignorKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  this.$element.addEventListener("keyup", function (e) {
    if (!ignorKeys.includes(e.key)) {
      onChange(e.target.value);
    }
  });

  this.$element.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}
