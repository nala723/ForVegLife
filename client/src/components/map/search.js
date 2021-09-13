import React, { useEffect, useState } from "react";
import MapIndex from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
const { kakao } = window;

export default function SearchPlace() {
  const mapCenter = useSelector((state) => state.MapCenter);
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
  const onClick = (x, y) => {
    setLatlng({
      ...latlng,
      x,
      y,
    });
  };

  return (
    <>
      <Map>
        <SearchForm className="inputForm" onSubmit={handleSubmit}>
          <input
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <button type="submit">검색</button>
        </SearchForm>
        <MapIndex latlng={latlng} />
      </Map>
      {data.map((x) => {
        return (
          <PlaceData onClick={() => onClick(x.x, x.y)}>
            {x.place_name}
          </PlaceData>
        );
      })}
    </>
  );
}
const Map = styled.div``;
const PlaceData = styled.span`
  background-color: none;
  top: 3em;
`;
const SearchForm = styled.form`
  position: absolute;
  top: 3em;
  right: 4em;
  background-color: red;
`;
