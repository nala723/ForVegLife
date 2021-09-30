import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as EmptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { newAccessToken, getgoogleToken } from "../../../actions";
import theme from "../../../styles/theme";
const axios = require("axios");
export default function MenuInfo({ place, menu, price, like, src, setFav }) {
  const selPlace = useSelector((state) => state.selectPlace);
  const user = useSelector((state) => state.userReducer);
  const googleState = useSelector((state) => state.googleReducer);
  const { googleToken } = googleState;
  const dispatch = useDispatch();
  const [favirote, setFavirote] = useState(false);

  useEffect(() => {
    if (like) {
      setFavirote(true);
    } else {
      setFavirote(false);
    }
  }, [selPlace.id]);
  const onLike = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/restaurant/${selPlace.id}/like`,
        {},
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setFav();
        setFavirote(true);
        if (res.headers.accessToken) {
          if (googleToken) {
            dispatch(getgoogleToken({ accessToken: res.headers.accessToken }));
          } else {
            dispatch(newAccessToken({ accessToken: res.headers.accessToken }));
          }
        }
      });
  };

  const onDisLike = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/restaurant/${selPlace.id}/dislike`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setFav();
        setFavirote(false);
        if (res.headers.accessToken) {
          if (googleToken) {
            dispatch(getgoogleToken({ accessToken: res.headers.accessToken }));
          } else {
            dispatch(newAccessToken({ accessToken: res.headers.accessToken }));
          }
        }
      });
  };

  return (
    <Temp>
      <Picture src={src} />
      <Placename>
        <Name style>{place}</Name>
        {user.isLogin ? (
          favirote ? (
            <FontAwesomeIcon
              onClick={onDisLike}
              icon={fullHeart}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              onClick={onLike}
              icon={EmptyHeart}
            ></FontAwesomeIcon>
          )
        ) : (
          ""
        )}
      </Placename>
      <Menubar>
        {menu.length !== 0
          ? menu.map((x, idx) => {
              return (
                <MenuPrice>
                  <Menu> {x}</Menu>
                  <Price> {price[idx]}</Price>
                </MenuPrice>
              );
            })
          : ""}
      </Menubar>
    </Temp>
  );
}
const Temp = styled.div`
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
  border-bottom: 0.1rem solid rgba(187, 187, 187, 0.5); ;
`;
const Placename = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 1rem 1rem 0;
  font-weight: 700;
  font-size: 1.2rem;
  justify-content: space-between;
`;

const Picture = styled.img`
  width: 100%;
  min-height: 8rem;
`;
const Name = styled.div`
  justify-content: flex-start;
  color: ${theme.colors.brown};
`;

const Menubar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const MenuPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem;
  font-weight: 100;
  color: ${theme.colors.mapgrey};
`;
const Menu = styled.div``;
const Price = styled.div``;
