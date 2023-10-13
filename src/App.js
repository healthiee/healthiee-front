import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SplashScreen />} />
          <Route path='/startpage' element={<StartPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;