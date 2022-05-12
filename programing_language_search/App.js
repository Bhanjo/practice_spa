import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import SelectedLanguage from "./SelectedLanguage.js";

import fetchLanguages from "./api.js";

export default function App({ target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });
    selectedLanguage.setState(this.state.selectedLanguages);
  };

  const selectedLanguage = new SelectedLanguage({
    target,
    initialState: [],
  });

  const searchInput = new SearchInput({
    target,
    initialState: "",
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    target,
    initialState: {
      // cursor: 0,
      selectedIndex: 0,
      items: [],
    },
    onSelect: (language) => {
      alert(language);

      // 추가하려는 언어가 이미 선택된 언어일 경우 맨 뒤로 보내기
      const nextSelectLanguages = [...this.state.selectedLanguages];
      const index = nextSelectLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );
      if (index > -1) {
        // 해당 인덱스에 해당하는 요소 삭제
        nextSelectLanguages.splice(index, 1);
      }
      nextSelectLanguages.push(language); // 맨 뒤에 삽입

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectLanguages,
      });
    },
  });
}
