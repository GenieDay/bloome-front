
// 로그인 세션 관리
export const userInfo = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data))
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
}

// 로그아웃
export const deleteUserInfo = () => {
  localStorage.removeItem("userInfo");
}