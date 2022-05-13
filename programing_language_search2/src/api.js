export const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("API 리퀘스트 실패!");
};

const fetchInfo = async (keyword) =>
  request(`${API_END_POINT}/languages?keyword=${keyword}`);

export default fetchInfo;
