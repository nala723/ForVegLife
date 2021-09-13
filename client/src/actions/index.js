export const ISLOGIN = "ISLOGIN";
export const MAPCENTER = "MAPCENTER";
export const SELECTPLACE = "SELECTPLACE";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const isLogin = (data) => {
  return { type: ISLOGIN, payload: { data } };
};
export const mapCenter = (data) => {
  return { type: MAPCENTER, payload: { data } };
};
export const selectPlace = (data) => {
  return { type: SELECTPLACE, payload: {data} };
};
