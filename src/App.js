import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// Root route
import MainRoot from './pages/MainRoot';

// router
import CreateAccount from './components/CreateAccount/CreateAccount';
import HomePage from './pages/HomePage';
import FirstPage from './pages/First';
import SecondPage from './pages/Second';
import ThirdPage from './pages/Third';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Description from './pages/ProfilePage/Description';
import Event from './pages/ProfilePage/Event';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import EmailLogin from './pages/EmailAuth/EmailLogin';
import EmailAuthLink from './pages/EmailAuth/EmailAuthLink';
import AuthCompleted from './pages/EmailAuth/AuthCompleted';

const router = createBrowserRouter([
  {path: '/',
   element: <MainRoot/>, 
   children: [
    {index: true , element: <HomePage/>},
    {path: 'first', element: <FirstPage/>},
    {path: 'second', element: <SecondPage/>},
    {path: 'third', element: <ThirdPage/>},
    {path: 'profile', 
    element: <ProfilePage/>,
    children: [
      {index: true, element: <Description/>},
      {path: 'event', element: <Event/>},
    ]},
  ]},
  {path: '/createAccount', element: <CreateAccount/>},
  {path: '/screen', element: <SplashScreen />},
  {path: '/startpage', element: <StartPage />},
  {path: '/emaillogin', element: <EmailLogin />},
  {path: '/emailauthlink', element: <EmailAuthLink/>},
  {path: '/authcompleted', element: <AuthCompleted />},
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
