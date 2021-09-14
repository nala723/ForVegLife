import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as EmptyHeart } from "@fortawesome/free-regular-svg-icons";
import theme from "../../../styles/theme";
const axios = require("axios");
export default function MenuInfo({ place, menu, price }) {
  const [favirote, setFavirote] = useState(false);
  console.log(favirote);
  const onLike = () => {
    setFavirote(true);
  };
  const onDisLike = () => {
    setFavirote(false);
  };

  return (
    <Temp>
      <Picture src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEPEBAQDxAQEBAQDQ8QEA8PDxAREBEPFRIYGBUSFhMYHiggGBomJxYXITIhJSkrLi8uFx8zODUsNygtLisBCgoKDg0OGhAQGi0lHyYtLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLy0rKy0tLS0tLS0tLS0tKy0tLS0tLS0tLf/AABEIAKMBNgMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABCEAACAQIDBQUEBgcHBQAAAAAAAQIDEQQSIQUGMUFREyJhcZEHMoGxFDRicqHBQlJzdLPR8CMzU5PS4fEVF0Oiwv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAyEQEBAAIBAwICCAUFAQAAAAAAAQIRAwQhMRJBE1EUIjJhcYGRwQVDodHwIzRScrGC/9oADAMBAAIRAxEAPwDajseAAAAAAAAAAAAAAA5azdoqItHDfLfthfVqP7OPyMMvNdGH2Z+EZAqsAAAAAAAAAAAAAAAAAAAAAAAAAAAAi4EgAAAAAAAAAADlpvGioi0cOXlv2wvq1H9nH5GGXmujH7M/CMgVWAAEN/8AIFjX2zhoaSr07rkpZn6RuR6o1nByXxFGG8GFlwq/+lT+RHri30bk+S4o7VoT92rDybyv0ZPqit4OSeYvFK/DXyJZXt5SAAAAAAAAAAAAAAAAAANw2VOk6VNKnfLTpqc+zTipuKbTfG+uvmc+W9vV4bhcJNe09levVow4004p2lONNOEeWr/lwKyWtMssJ7f0ajQwjqSmk4wjC7lOTtGKvZHRbp5WPH6rfaRWp7Jm3UV4qVObhld7zllcko6c0iPXF50+V3PkqU9iVGovNBOXGPecovJms0lxty8R8SJnTZWTv/nl4nsmSllzJzcZSjFxqQcrclmSux64i8Fl1vv+f7ktlOKbnVpwy5VK+Z5ZSV1F2XEev5Q+BqfWsi1xeH7NpZoyUoKalG9mnw4lpds88PTdb2okqAAABy1m8aPUm1ayvqr62supZxalt3XQNhfVqP7OPyMMvNb4fZn4RkCqyJO2r0S1bfQGvZrO1t7Iwbhh0qkudSXuJ+C4y+XmZ3P5Ozi6S3vn+jVcbtCrXd6tSU/Bu0V5RWhS213Y8eOPbGLaKu7LV8ktX6ELshhMBW1/sa3L/wAVT+QEyVnZ6Pmno/QgV8LjKlJ3pzlHwT7vxT0LS6Uywxy7WNg2bvIpWjXSi/117vxXIvM/m4uXpLO+H6NgjJNJp3T4NGji8dnoAAAAAAAAAAAAAAABuOycEuypyjUmozp03OEXHK55Em72uuGtmc2eXd6vBxz0Sy+ZF5XwalHLmcabVpQVsrj04aLyKzJtlxyzW+zTKeOnTU402oqU8zaSu+iv0On0y+XkTlyx3MU1tpVJ2u1dShLMlaTlBNRbfXUTGROXNnl5/wA09UtqVY31TzTlN5o3vKUcr+FuQuEMefOf+qdTGylKE8sIuDTWSCirpp6248CfSi8ltl7dk0toTjn0hJVJ55RnBSjm11SfDiRcYTlym/Hf5qWJxDqSzSUVaKilGKjFJcEkTJpXPO5XdUiVQAAA5azojQqK+XS/eXO1vEWOTG973dC2F9Wo/s4/Ixy81rh9mfhF9OSSbbSSTbb0SS5sqtJb4aHvDt+WIbp0240U/J1PF+HRevhjllt6nB08wm75WOxtkV8bVVLDU3Unxk+EYR/WnLhFf0rlPDpdP3a9m+Dg5fSaqxdanJRq0oTy0qU3FSUZRXebtJPvWumtCLU6b3gtn0aEctGlTpR6U4RgvwKpempdpftO72duytH3r+/m4+FuARtGLwVKsstWlTqLpUhGS/EJaXvDuBhJZewqLC1aknGnCUr0qk8rllUW7p2Tfd4JPQnaNOc7Y2RWwdTssRBwlxi+MJr9aMua/p2LSoVtjbXlQajK7pN8OcfFeHgXxy15c/PwTkm55blSqKSUotNNXTRs8qyy6r0BIAAAAAAAAAAAAAAAAAAAAAAAAAAALr/t1s7/ABcR/mw/0nN9L++PYnQT5VK9nmzv8XEf5sP9I+m/fGd/hWF9qtJ4SFByo0m3TpvJByd20kuLOjHL1Tfzefy4ejO4z2ajvntXX6NB9JVWvVQ/N/ApnfZ19LxdvXfyYbd3YlXH4iNCjo33pzavGnTVs0368ObaRnezud72BsOjgaMaNCNktZSds9SfOcnzfy4IzWZKMUr2XHV+LAkDF1Prsf3SX8RGv8v8/wBq5r/uP/m/+xlEZOlDinbw4eAFjtrZFLGUpUa8c0Xwa96EuUovkwOIbw7FqYGvKjU1/Sp1ErKpTfCS6dGuTLy7VXe7W0nB9lJ913cfB80b8Vl+rXB1nF2+JPzbVF31Reyy6rgleiEgAAAAAAAAAAAAAAAAAAAAAAAAA90aMpu0Vd/LzZTPPHGbyumnFxZ8mWsI2U8Svrp4Alq+2ayouvOXCGefmrXXqexw5f6U/B8v1PHb1OWPzv8ARyivWc5SnN3lKTlJ+L1ZV6MmpqO1ezzYM8FhKU1CDrYqcKmIc5OMoUHFuEY2Tu1dd121lLUpatG6EJAAGMqfXY/ukv4iNf5X5/tXNf8AcT/r+8ZNGTpAAGqb8bEnjMLVbhDtaEpVMM4NylKmorNGV0rN95WV1pEmVFcbpzaakuKaafiX3pWzc1W77PxOaEZLhKKdujPQ1OTGV4GeN487jV+ncws0tvaSEpAAAAAAAAAAAAAAAAAAAAAAAQBn9nUVCnHrJKTfizyOp5Lnnfk+m6DhnHwy+971dGDtAMTvRstYnC1ocJ9m3CS45o96MX4Nq1vE14uS43Xsw5uHHKb13jkm7WBWKxeFovWNWvBSXWmu9P8ABM9G+Hnx3fau8FLDPJrOa4wha0fN8vI87qOu4+G68118XTZ8nfxGOo75RbtOi4x6xmpNfCyOXH+K47+tjqN8ugy12vds2HrRqRU4PNGSTTXNHq45TKbnhw2WXVVCyGMqfXY/ukv4iNf5X5/tXNf9xP8Ar+8ZNGTpAAADgW82BWHxmJorSMK0nFdIS70V6SReK1kt26l6TX6s2vg9fzO3p79XTyP4hj/qS/OM1TnbyNc8duPG6XKZz2WNdpISAAAAAAAAAAAAAAAAAAAAAhlc7Zjbj5WwkuUmXjfdYyqS6yPjcuo6jd3ld/jY+1x6bp9fVxmvwlblhf7uH3I/I9TG7xlrPUnaKpYANW2niqqq1FnnFKTslJpZeWh5XNyckzveujDHG4sZRoxpyU4RjCUeE4RUJK6tpJariUvPy/8AK/1T8LD/AIx6Zku2TYmwKNejGpOpOMm5JqMoJaNrmj1Ol6Lj5eOZ5Xvf71w8/U54Z3GTszuHrYfAwjSlW01lHO7yab5ZVwPY6bpbjx+nDdkeV1XWccz3yWS17/6/R/RVaf3MPXf/AMnT8DP31+sc307ivjd/DHL+zE0duOptSNFYavGP0R/2tSDguOa9mvd0te/Flcvq4+n79tOP6+c5e87Was1fPn+ja0ZugAAUsVW7ODlknO1u5TSc3d20TaA477S422lV8aVFvzyW/IvFatd13/eecTq6f3eb/EJ9lnjqea90528imePqWl0uEzn1pqkAAAAAAAAAAAAAAAAAAAAEMARqb3Yndk8s3hMbDs1mkk4xSafHTouZ5nL0+fxO07V9B03W8fwZ6su88/kq/TqeTPmXC+W6zeVupn9Hz9Xp02+m8Po9fq/L3/RLxtNW78dWufXr0HwOTetJvW8GpfV5/wA7tN9qFe9CioSvlr3m4vRXhJR19Tfg4rN3Kfcx5uowzymGN379ms7hYnLtLC53mhOpKnJS1TzwlFaPxaNssMbNWM5bL2dV21utm7+GSi+dJu0X4xfLy4eR4/Vfw7f1uL9P7O/g6zXbP9WGobtYmckpU8ivrKTjZej1OLD+Hc2V1cdOrLrOOTcu29YHCRo04U48IRUU/wAz6DiwnHhMJ4jyc8rllcquTRUAAAAADiHtAxCqbRxLXCDhT+MYRT/G5eeFU7rw7k31ml6L/c6un968zr73kZw6Hn6Al7hK3kUyx2mXSumYtEgAAAAAAAAAAAAAAAAAAAAAAIAAY7eHC9rhqsUryUc8fvR1t+DXxK5Tca9Pl6eSVzqhWlCUZwdpQnGcH0lF3T9UYvYfRey9t0a+Hw9fPGKxKioKTSvVad6a6yTjJW+yzNZkwAAAAAAALDHbWpUqVeq5xawyl2iTV1NRTUH9p5o6faQHAsRXlUnOpPWVScpyf2pNt/M0UbZsTD5KME+LWZ/HU7OKaxeN1Wfq5b93ZfmrnTYgAPUJWKZTaZdKyZk0SAAAAAAAAAAAAAAAAAAAAAAAAQBzneLZ30evJJdyd50+lnxj8Hp6GOU1Xr8HJ68JW1+y3eiOGqfQ68rUa070py4U670tfkpfPzZnY3jsaKpAAAAAAAcp9pe8qrT+h0JXp053rSXCdVcIX5qPPx8i0iK1DZWE7aqo/orvT+70+Jphj6qw5+X4eFvv7N0SO54aUBIAgCB6i7FbNrS6VUzNdIAAAAAAAAAAAAAAAAAAAAAAABj9t7LjiaTg7KS71OX6sv5PmVym2vDy/Dy3+rnOJw8qcpU6kcsou0k/61Ri9fHKWbjom43tF7KMcNj3JwVo08TrKUVyjU5tfa49epWxaV0/A13UzTUqU6UnF0J0pueeGVXbfC978G9LFUroAAAtsZWcMsr0404ybrSqScVGnleqfC98vG2lwOd75b/51KhgZNJ3jPE6ptc1T6fe9OpaRFrn1Gk5NRirtuySLee0VuUk3fDcdlYBUIW4yes5dX0XgdmGHpjxeo5vi5b9vZfGjAI2BAmwToINJCUxdithtUTKLpAAAAAAAAAAAAAAAAAAAAAAAAMZtrY1PFR17tRLuVEtV4Nc0Vyx224ee8d+5oe0dm1cPLLVjZX7s1rCXk/y4mVmnp8fJjyTcVtj7dxOCd8NWnTu7uCd6cn403eLfja5XUaNywHtYxEUlXw1Kr1lTlKk/R5l8iPSbZCl7UKUp9r9Bkqqp9nm7de43fLfL1XQelO1LG+0+vJNUcPSp/aqSlUfosqHpNtS2ttvE4t3xFadRJ3UNI015QWnx4lpELbB4OdZ2pxv1l+ivNkzG5doz5OTHjm8q2vZey40Ff3ptayfyXRHVhxzF5PP1F5Lr2X5o5wgSEhAkJABAkCU7EWJj2iiyQAAAAAAAAAAAAAAAAAAAAAAADxVpRmnGcVKL4xkk0/gwmWzvGvY/dOlK7pOVJ9F3o+j1/Ej4eNdOPWZ4+Zth626tde7KnNebi/Rr8yt4cm863jvncRh93sQm7wjy1zxsR8LP5L/AEvi+f8ASrunu7VfvShH4tv5EzhyUvW8U8brI4Xd6nHWcnUfT3Y+i1/E0nDPdz59blfszTL06aikopRS4JKy9DWdnFllcruvQQkJCDSQkAECbAABAlIJSmRUvSKpSAAAAAAAAAAAAAAAAAAAAAAAAQB4nTv5l8ctK3FTsabUABAkAQlIAJCBIAAQJsBNgkAEAhUvRVKQAAAAAAAAAAAAAAAAAAAAAAAAB5krky6RZtTcbGku1daQSJIAAQJAACBIE2CQAQAAJAJRAkhKQAAAAAAAAAAAAAAAAAAAAAAAABDQHhwLTJX0mQn1Gk5CPUaMg9Royj1GjKNmk5RtOiw2aRlGzSbDZosRs0WGwsNhYbCwAD0QkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==" />
      <Placename>
        <Name style>{place}</Name>
        {favirote ? (
          <FontAwesomeIcon
            onClick={onDisLike}
            icon={fullHeart}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon onClick={onLike} icon={EmptyHeart}></FontAwesomeIcon>
        )}
      </Placename>
      <Menubar>
        {menu.map((x, idx) => {
          return (
            <MenuPrice>
              <Menu> {x}</Menu>
              <Price> {price[idx]}</Price>
            </MenuPrice>
          );
        })}
      </Menubar>
    </Temp>
  );
}
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
  border-bottom: 0.1rem solid rgba(187, 187, 187, 0.5);;
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
  color: ${theme.colors.brown}
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
  color: ${theme.colors.mapgrey}
`;
const Menu = styled.div``;
const Price = styled.div``;
