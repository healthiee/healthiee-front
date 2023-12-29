import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
// import './interceptors/axios';

// Root route
import MainRoot from './pages/MainRoot';

//loader
import {loader as HomeLoader} from '../src/components/HomePage/Home';
import {loader as CodeLoader} from '../src/components/PostForm/PostForm';
import {loader as NicknameLoader} from './components/Search/SearchName';

// router
import CreateAccount from './components/CreateAccount/CreateAccount';
import HomePage from './pages/HomePage';
import SearchTab from './pages/SearchPage/SearchTab';
import SearchPage from './pages/SearchPage/SearchPage';
import SearchName from './components/Search/SearchName';
import SearchPost from './components/Search/SearchPost';
import RecommendTab from './pages/RecommendTab';
import CreatePost from './pages/CreatePost';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Description from './pages/ProfilePage/Description';
import Event from './pages/ProfilePage/Event';
import SplashScreen from './pages/SplashScreen';
import StartPage from './pages/StartPage';
import EmailLogin from './pages/EmailAuth/EmailLogin';
import AuthCompleted from './pages/EmailAuth/AuthCompleted';
import AuthLogin from './pages/EmailAuth/AuthLogin';
import Comments from './components/HomePage/CommentModal/Comments';
import ReplyCommentsModal from './components/HomePage/CommentModal/ReplyCommentsModal';
import Post, {loader as PostLoader} from './components/HomePage/Post/Post';
import EditPage from './pages/EditPage';

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/screen" element={<SplashScreen />} />
      <Route path="/startpage" element={<StartPage />} />
      <Route path="/emaillogin" element={<EmailLogin />} />
      <Route path='/' element={<MainRoot />}>
        <Route index element={<HomePage />} loader={HomeLoader} />
        <Route path="search" element={<SearchTab />}/>
        <Route path='result/:nickname' element={<SearchPage/>}>
          <Route index element={<SearchName/>} loader={NicknameLoader}/>
          <Route path='posts' element={<SearchPost/>}/>
        </Route>
        <Route path="recommend" element={<RecommendTab />} />
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<Description />} />
          <Route path="event" element={<Event />} />
        </Route>
      </Route>
      <Route path="/post/:id" loader={PostLoader} id='post-detail'>
        <Route index element={<Post/>}/>
        <Route path="edit" element={<EditPage/>} loader={CodeLoader}/>
      </Route>
      <Route path="/post/:id" element={<Post />} loader={PostLoader}/>
      <Route path="/comments" element={<Comments />} />
      <Route path="/comments/:commentId" element={<ReplyCommentsModal />} />
      <Route path="/createPost" element={<CreatePost />} loader={CodeLoader}/>
      <Route path="/email-login" element={<AuthLogin/>} />
      <Route path="/authcompleted" element={<AuthCompleted />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path='*' element={<p>There's nothing here: 404!</p>} />
    </Route>
  ))

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;