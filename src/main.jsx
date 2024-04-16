import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Game from './pages/Game.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    elemente: <App/>,
    children:[
      {path: "/", element : <Game/>},
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
