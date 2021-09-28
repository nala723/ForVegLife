const calcRem = (size) => `${size / 16}rem`;
    
    const fonts = {
    family: {
      base: `Roboto, 'Orienta', sans-serif`,
      mypage:`'Orienta',sans-serif`,
      button: `'Montserrat', serif`,
      logo: `'Berkshire Swash'`
    },
    size: {
      sm: calcRem(10),
      base: calcRem(15),
      lg: calcRem(18),
      llg: calcRem(25),
      xl: calcRem(30),
      title: calcRem(6),
    },
    weight: {
      light: 100,
      normal: 400,
      bold: 700,
    },
  };
  
  const colors = {
    lightgreen: '#C5E87C',
    green: "#7CB700",
    red: "#D90000",
    logoText: '#B15500',
    darkgrey: '#4B3F3F',
    brown: '#966652',
    lightbrown: '#B96619',
    mypagecard: '#F2EDED',
    grey: '#BBBBBB',
    lightgrey:'#DFDFDF',
    mapgrey: '#7C6D6D'
  };
  
  const size = {
    mobileS: "320px",
    mobile: "425px",
    tablet: "768px",
    change: "960px",
    laptop: "1024px",
    desktop: "1440px",
  };
  
  // 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
  const device = {
    mobileS: `only screen and (max-width: ${size.mobileS})`,
    mobile: `@media only screen and (max-width: ${size.mobile})`,
    tablet: `@media only screen and (max-width: ${size.tablet})`,
    change: `@media only screen and (max-width: ${size.change})`,
    laptop: `@media only screen and (max-width: ${size.laptop})`,
    desktop: `@media only screen and (max-width: ${size.desktop})`,
  };
  
  
  // 테마와 관련없이 공통으로 사용되는 변수들입니다
  const defalutTheme = {
    fonts,
    device,
  };

  const theme = {
    fonts,
    colors,
    device,
    defalutTheme,
  }


  export default theme;