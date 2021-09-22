import React, { useEffect, useState } from "react";
import MapIndex from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../../actions";
import axios from "axios";
const { kakao } = window;
const veggieIcon = [
  {
    img: "/image/abocado-icon.png",
    name: "비건",
  },
  {
    img: "/image/cheese-icon.png",
    name: "오보",
  },
  {
    img: "/image/egg-icon.png",
    name: "락토",
  },
  {
    img: "/image/eggcheese-icon.png",
    name: "락토오보",
  },
  {
    img: "/image/fish-icon.png",
    name: "페스코",
  },
];
export default function SearchPlace({ selData, setCategory }) {
  const mapCenter = useSelector((state) => state.MapCenter);
  const dispatch = useDispatch();
  const [latlng, setLatlng] = useState({
    x: 0,
    y: 0,
  });
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  // const ps = new kakao.maps.services.Places();
  const [data, setData] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  useEffect(() => {
    var places = new kakao.maps.services.Places();
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setData(result);
        console.log(result);
        return result;
      }
    };
    places.keywordSearch(inputText, callback, {
      x: mapCenter.x,
      y: mapCenter.y,
      radius: 1000,
    });
  }, [mapCenter, inputText]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };
  const onClick = (x, y, address, name) => {
    setLatlng({
      ...latlng,
      x,
      y,
    });
    dispatch(selectPlace({ x, y, address: address, name: name }));
  };

  return (
    <>
      <SearchForm className="inputForm" onSubmit={handleSubmit}>
        <div>
          {" "}
          <PlaceInput
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <SearchButton type="submit">검색</SearchButton>
        </div>
        <Keyword>
          {data.map((x) => {
            return (
              <PlaceData
                onClick={() => onClick(x.x, x.y, x.address_name, x.place_name)}
              >
                <PlaceName>{x.place_name}</PlaceName>
                <PlaceAddress>{x.address_name}</PlaceAddress>
              </PlaceData>
            );
          })}
        </Keyword>
      </SearchForm>
      <Category>
        {veggieIcon.map((x) => {
          return (
            <Type src={x.img} onClick={() => setCategory(x.name)}>
              {" "}
              {x.name}
            </Type>
          );
        })}
      </Category>
      <MapIndex data={selData} latlng={latlng} />
    </>
  );
}

const SearchForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 3rem;
  right: 4rem;
`;
const Category = styled.div`
  position: absolute;
  flex-direction: column;
  display: flex;
  top: 3rem;
  right: 1rem;
  display: flex;
`;

const Type = styled.image`
  width: 3rem;
  height: 3rem;
`;
const SearchButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
`;
const PlaceInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 10rem;
  height: 2rem;
  border-radius: 2rem;
`;
const PlaceData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0.5rem;
  height: 3rem;
  color: black;
  font-size: 0.4rem;
  margin: 0.4rem;
`;
const PlaceName = styled.div`
  font-size: 0.2rem;
`;
const PlaceAddress = styled.div`
  font-size: 0.2rem;
`;
const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  height: 7rem;
  background-color: rgba(0, 0, 0, 0);
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
