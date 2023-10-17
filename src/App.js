import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//router
import CreateAccount from './components/CreateAccount/CreateAccount';
import HomePage from './pages/HomePage';
import FirstPage from './pages/First';
import SecondPage from './pages/Second';
import ThirdPage from './pages/Third';
import ForthPage from './pages/Forth';
import MainRoot from './pages/MainRoot';

const router = createBrowserRouter([
  {path: '/',
   element: <MainRoot/>, 
   children: [
    {index: true , element: <HomePage/>},
    {path: 'first', element: <FirstPage/>},
    {path: 'second', element: <SecondPage/>},
    {path: 'third', element: <ThirdPage/>},
    {path: 'forth', element: <ForthPage/>},
  ]},
  {path: '/createAccount', element: <CreateAccount/>},
]);

function App() {
  return ( <RouterProvider router={router}/> );
}

export default App;
