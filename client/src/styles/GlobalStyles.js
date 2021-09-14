import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Orienta&family=Roboto&display=swap');
    a{
        text-decoration: none;
        color: inherit;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    ol, ul, li {
    list-style: none;
   }
   :root {
    --font-base: Roboto, 'Orienta', sans-serif;
    --font-button: button: 'Montserrat', serif;
    --font-logo: logo: 'Berkshire Swash';
    --font-mypage: 'Orienta',Roboto, sans-serif;
    --font-size-sm: 10px;
    --font-size-base: 15px;
    --font-size-lg: 18px;
    --font-size-xl: 30px;
    --font-weight-light: 100;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    --color-lightgreen : #C5E87C;
    --color-green: #7CB700;
    --color-red: #D90000;
    --color-logoText: #B15500;
    --color-darkgrey: #4B3F3F;
    --color-brown: #966652;
    --color-lightbrown: #B96619;
    --color-mypagecard: #F2EDED;
    --color-grey: #BBBBBB;
    --color-lightgrey: #DFDFDF;
    --color-mapgrey: #7C6D6D;
  }

`;

export default GlobalStyles;
