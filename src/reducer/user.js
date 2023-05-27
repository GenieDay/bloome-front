
// 로그인 세션 관리
export const userInfo = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data))
};
