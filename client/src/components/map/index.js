import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { mapCenter } from "../../actions/index";
const { kakao } = window;

const API_KEY = "8ae459a51f5b018322fee10f7aa86f24";

export default function MapIndex() {
  const dispatch = useDispatch();
  useEffect(() => {
    let address = "";
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    kakao.maps.event.addListener(map, "tilesloaded", function () {
      if (map.getCenter() > 4) {
        return;
      }
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      console.log(address);
    });
    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다

      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            console.log(result[i]);
            dispatch(mapCenter({ x: result[i].x, y: result[i].y }));
            address = result[i].address_name;
          }
        }
      }
    }
  }, []);

  return (
    <>
      <Map id="map"></Map>
    </>
  );
}

const Map = styled.div`
  position: absolute;
  width: 100vw;
  height: 95vh;
  z-index: -1;
`;
