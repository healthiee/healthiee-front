import { createBrowserRouter, RouterProvider  } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import EmailLogin from './pages/EmailAuth/EmailLogin';

const router = createBrowserRouter([
  {path: '/', element: <SplashScreen />},
  {path: '/startpage', element: <StartPage />},
  {path: '/emaillogin', element: <EmailLogin />}
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;