import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Board from '../pages/Boards/_id.jsx'
import AppBar from '../components/AppBar/AppBar.jsx'
import { Register } from "../pages/Auth/Register/index.jsx"
import { Login } from "../pages/Auth/Login/index.jsx"
import Home  from "../pages/Auth/_id.jsx"

const Router = createBrowserRouter([
      { 
        path: '/',
        element: 
          <>
            <AppBar/>
            <Home/>
          </>,
        errorElement: <h1>error 404</h1>
      },
      {
      path: '/page',
      element: 
        <>
          <AppBar/>
          <Outlet></Outlet>
        </>  
      ,
      children: [{
        path: '/page/board',
        element: <Board/>
      },
      {
        path: '/page/register',
        element: <Register/>
      },
      {
        path: '/page/login',
        element: <Login/>
      }]
    },
  ])

export default Router