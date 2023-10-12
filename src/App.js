import React from 'react';
import CreateAccount from './components/CreateAccount/CreateAccount';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <CreateAccount/>},
  {path: '/createAccount', element: <CreateAccount/>}
]);

function App() {
  return ( <RouterProvider router={router}/> );
}

export default App;
