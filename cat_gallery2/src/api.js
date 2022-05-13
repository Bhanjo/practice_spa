const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const req = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    const json = await res.json();
    // console.log('패치', json);
    return json;
  }
  throw new Error("데이터 패치 에러 발생!");
};

const fetchData = (keyword) =>
  req(keyword ? `${API_END_POINT}/${keyword}` : `${API_END_POINT}`);

export default fetchData;
