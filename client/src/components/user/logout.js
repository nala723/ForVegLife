import react, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../actions/index";

export default function Logout() {
  let userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const logout = (e) => {
    dispatch(userLogin({ accessToken: "", email: null, nickName: null,  profileblob: "", isLogin: false }));
  };
  return (
    <>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
