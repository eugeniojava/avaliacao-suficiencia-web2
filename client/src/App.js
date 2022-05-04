import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import Private from "./private";

import { useAuth } from "./contexts/authentication";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link
              className="navbar-brand"
              to={currentUser ? "posts" : "/login"}
            >
              My Posts
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="navbar-nav container">
                {currentUser ? (
                  <div className="nav-item">
                    <Link className="nav-link" to={"/create-post"}>
                      Create a post
                    </Link>
                  </div>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/register"}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
                <div className="nav-item">
                  <Link className="nav-link" to={"/posts"}>
                    Posts
                  </Link>
                </div>

                {currentUser && (
                  <div className="nav-item">
                    <button
                      onClick={logout}
                      className="btn btn-danger ml-auto"
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/post" element={<Post />} />

          <Route
            path="/create-post"
            element={
              <Private>
                <CreatePost />
              </Private>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
