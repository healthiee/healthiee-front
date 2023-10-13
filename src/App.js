import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import EmailLogin from './pages/EmailAuth/EmailLogin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SplashScreen />} />
          <Route path='/startpage' element={<StartPage />} />
          <Route path='/emaillogin' element={<EmailLogin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;