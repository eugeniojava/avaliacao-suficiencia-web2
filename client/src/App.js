import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Post from './components/Post';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Register from './components/Register';
import { useAuth } from './contexts/auth';
import PrivateRoute from './privateRoute';

function App() {
  const { currentUser, logout } = useAuth();
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>
              My Posts
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="navbar-nav container">
                {currentUser && (
                  <div className="nav-item">
                    <Link className="nav-link" to={'/profile'}>
                      Profile
                    </Link>
                  </div>
                )}
                {currentUser ? (
                  <div className="nav-item">
                    <Link className="nav-link" to={'/posts/new'}>
                      Create post
                    </Link>
                  </div>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/login'}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/register'}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
                <div className="nav-item">
                  <Link className="nav-link" to={'/posts'}>
                    Posts
                  </Link>
                </div>
                {currentUser && (
                  <div className="nav-item">
                    <button
                      onClick={logout}
                      className="btn btn-danger"
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route
            path="/posts/new"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
