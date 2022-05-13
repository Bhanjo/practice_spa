const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ app, initState }) {
  (this.state = initState), (this.$element = document.createElement("div"));
  this.$element.className = "Modal ImageView";

  app.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    this.$element.innerHTML = `
            <div class="content">
                ${
                  this.state
                    ? `<img src="${IMAGE_PATH_PREFIX}${this.state}" />`
                    : ""
                }
            </div>
        `;
    this.$element.style.display = this.state ? "block" : "none";
  };
  this.render();
}
