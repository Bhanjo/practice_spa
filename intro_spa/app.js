import Page from "./js/Page.js";

// 메뉴 클레스를 이용해 클릭 이벤트 할당
class Menu {
  $introBtn = document.querySelector(".introduce");
  $contactBtn = document.querySelector(".contact");
  menu; // 현재 메뉴가 어떤 메뉴인지 판별

  constructor() {
    this.menuClick();
  }

  changeView(url) {
    // 이미 해당 메뉴 상태면 그대로 리턴
    if (this.menu === `/${url}`) return;

    this.menu = `/${url}`; // 현재 메뉴로 바꿈
    window.history.pushState({ path: `/${url}` }, "", `/${url}`); // url 주소 변경

    // 페이지 객체 생성 후 렌더링
    const page = new Page();
    page.render();
  }

  menuClick() {
    // 자기소개 버튼 클릭 이벤트
    this.$introBtn.addEventListener("click", () => {
      this.changeView("introduceMe");
    });

    // 컨택트 메뉴 클릭 이벤트
    this.$contactBtn.addEventListener("click", () => {
      this.changeView("contact");
    });
  }
}

// 브라우저 이동시 발생 이벤트
window.onpopstate = function (e) {
  const page = new Page();
  page.render();
};

new Menu();
