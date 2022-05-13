import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";

import fetchInfo from "./api.js";
import SelectList from "./SelectList.js";

export default function App(app) {
  this.state = {
    selectedLanguage: [],
    suggestLanguage: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectIndex: 0,
      items: this.state.suggestLanguage,
    });
    selectList.setState(this.state.selectedLanguage);
  };

  const selectList = new SelectList({
    app: app,
    initState: [],
  });

  // searchInput의 onChange이벤트
  const onChangeInput = async (keyword) => {
    if (keyword.length === 0) {
      this.setState({
        suggestLanguage: [],
      });
    } else {
      const language = await fetchInfo(keyword);
      this.setState({
        suggestLanguage: language,
      });
    }
  };
  const searchInput = new SearchInput({
    app: app,
    initState: "",
    onChange: onChangeInput,
  });

  // 목록 중 선택
  const onSelectSuggestion = (index) => {
    const idx = parseInt(index);
    const item = this.state.suggestLanguage[idx];
    alert(item);
    const selectedLanguages = [...this.state.selectedLanguage];
    if (selectedLanguages.includes(item)) {
      const existIndex = selectedLanguages.indexOf(item);
      selectedLanguages.splice(existIndex, 1);
    }
    selectedLanguages.push(item);
    if (selectedLanguages.length > 5) {
      selectedLanguages.shift();
    }
    this.setState({
      ...this.state,
      selectedLanguage: selectedLanguages,
    });
  };
  const suggestion = new Suggestion({
    app: app,
    initState: {
      selectIndex: 0,
      items: [],
    },
    onSelect: onSelectSuggestion,
  });
}
