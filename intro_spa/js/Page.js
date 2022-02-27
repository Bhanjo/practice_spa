export default class Page {
  // root로 app 지정
  $root = document.querySelector(".app");

  // html 객체로 보여줄 내용 생성
  html = {
    introduceMe: `
      <h1>INTRODUCE ME</h1>
      <h2>안녕하세요! 프론트엔드를 공부하는 배한조입니다!</h2>
      <p>SPA를 순수 JS로만 구현하는 연습 중입니다! 잘부탁합니다!</p>
    `,
    contact: `
      <h1>CONTACT</h1>
      <h2>Email: hanjo1515@naver.com</h2>
      <h2>
        <a href=""Git: https://github.com/Bhanjo>Git: https://github.com/Bhanjo</a>
      </h2>
    `,
  };

  render() {
    // 렌더링 할 때마다 root 엘리멘트 초기화
    this.$root.innerHTML = null;

    const { path } = window.history.state; // url에 전달한 상태
    const fragment = document.createElement("div");

    switch (path) {
      // path 상태별 렌더링
      case "/introduceMe":
        fragment.innerHTML = this.html.introduceMe;
        this.$root.appendChild(fragment);
        break;
      case "/contact":
        fragment.innerHTML = this.html.contact;
        this.$root.appendChild(fragment);
        break;
    }
  }
}
