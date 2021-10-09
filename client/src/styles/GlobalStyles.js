import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
   
    a{
        text-decoration: none;
        color: inherit;
    }
    *, :after, :before{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    body {
        padding: 0;
        margin: 0;
        width: 100vw;
        max-width:100%;
        height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    ol, ul, li {
    list-style: none;
   }
 

`;

export default GlobalStyles;
