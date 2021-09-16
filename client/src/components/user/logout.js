import react, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../actions/index";

export default function Logout() {
  let userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const logout = (e) => {
    dispatch(isLogin({ accessToken: "", isLogin: false, email: null, nickName: null }));
  };
  return (
    <>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
