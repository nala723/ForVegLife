import React, { useEffect, useState } from "react";
import MapIndex from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectPlace } from "../../actions";
import axios from "axios";
const { kakao } = window;

export default function SearchPlace({selData}) {
  const mapCenter = useSelector((state) => state.MapCenter);
  const dispatch = useDispatch()
  const [latlng, setLatlng] = useState({
    x: 0,
    y: 0,
  });
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [serachData, setSearchData] = useState([])
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
      radius: 1000
    });
  }, [mapCenter, inputText]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };
  const onClick = (x, y, address) => {
    setLatlng({
      ...latlng,
      x,
      y,
    });
    dispatch(selectPlace({x,y, address: address}))
  };

  return (
    <>
      <Map>
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
                <PlaceData onClick={() => onClick(x.x, x.y, x.address_name)}>
                  <PlaceName>{x.place_name}</PlaceName>
                  <PlaceAddress>{x.address_name}</PlaceAddress>
                </PlaceData>
              );
            })}
          </Keyword>
        </SearchForm>
        <MapIndex data={selData} latlng={latlng} />
      </Map>
    </>
  );
}
const Map = styled.div``;

const SearchForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 3rem;
  right: 10%;
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