import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme'; 

// Root route
import MainRoot from './pages/MainRoot';

//loader
import {loader as HomeLoader} from '../src/components/HomePage/Home';
import {loader as CodeLoader} from '../src/components/PostForm/PostForm';

// router
import CreateAccount from './components/CreateAccount/CreateAccount';
import HomePage from './pages/HomePage';
import FirstPage from './pages/First';
import SecondPage from './pages/Second';
import CreatePost from './pages/CreatePost';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Description from './pages/ProfilePage/Description';
import Event from './pages/ProfilePage/Event';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import EmailLogin from './pages/EmailAuth/EmailLogin';
import EmailAuthLink from './pages/EmailAuth/EmailAuthLink';
import AuthCompleted from './pages/EmailAuth/AuthCompleted';
import ReplyCommentModal from './components/HomePage/ReplyCommentModal';
import Post, {loader as PostLoader} from './components/HomePage/Post/Post';
import EditPage from './pages/EditPage';

const router = createBrowserRouter([
  {path: '/',
   element: <MainRoot/>, 
   children: [
    {index: true , element: <HomePage/>, loader: HomeLoader},
    {path: 'first', element: <FirstPage/>},
    {path: 'second', element: <SecondPage/>},
    {path: 'profile', 
    element: <ProfilePage/>,
    children: [
      {index: true, element: <Description/>},
      {path: 'event', element: <Event/>},
    ]},
  ]},
  {path: '/createPost', element: <CreatePost/>, loader:CodeLoader},
  {path: '/post/:id',
  loader: PostLoader,
  id: 'post-detail',
  children: [
    {path: 'edit', element: <EditPage/>, loader:CodeLoader},
    {path: '', element: <Post/>},
  ]},
  {path: '/createAccount', element: <CreateAccount/>},
  {path: '/screen', element: <SplashScreen />},
  {path: '/startpage', element: <StartPage />},
  {path: '/emaillogin', element: <EmailLogin />},
  {path: '/emailauthlink', element: <EmailAuthLink/>},
  {path: '/authcompleted', element: <AuthCompleted />},
  {path: '/reply', element: <ReplyCommentModal />},
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