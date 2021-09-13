import GlobalStyles from "./styles/GlobalStyles";

import Navbar from "./components/Navbar";
import styled, {ThemeProvider} from 'styled-components'
import theme from '../src/styles/theme'

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      </ThemeProvider>
    </>
  );
}

export default App;
