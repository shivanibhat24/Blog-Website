import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Dashboard from './pages/Dashboard';
import CategoryPosts from './pages/CategoryPosts';
import AuthorPosts from './pages/AuthorPosts';
import Logout from './pages/Logout'

const router=createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    errorElement:<ErrorPage />,
    children:[
      {index:true, element:<Home />},
      {path:"posts/:id", element:<PostDetail/>},
      {path:"register",element:<Register />},
      {path:"login",element:<Login />},
      {path:"profile/:id",element:<UserProfile />},
      {path:"authors",element:<Authors />},
      {path:"create",element:<CreatePost/>},
      {path:"posts/:id/edit",element:<EditPost />},
      {path:"posts/:id/delete",element:<DeletePost />},
      {path:"posts/categories/:category",element:<CategoryPosts />},
      {path:"posts/users/:id",element:<AuthorPosts />},
      {path:"myposts/:id",element:<Dashboard />},
      {path:"logout",element:<Logout/>},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


