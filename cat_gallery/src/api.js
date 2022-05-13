const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const req = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`);
    if (!res.ok) {
      throw new Error("서버의 상태가 이상합니다");
    }
    const json = await res.json();
    return await json;
  } catch (e) {
    throw new Error(`무언가가 잘못됐습니다. ${e.message}`);
  }
};

export default req;
