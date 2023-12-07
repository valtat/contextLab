import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState} from "react";
// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   Boolean(localStorage.getItem("token")) || false
  // );
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar
            // isAuthenticated={isAuthenticated}
            // setIsAuthenticated={setIsAuthenticated}
          />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/" />
                  ) : (
                    // <Login setIsAuthenticated={setIsAuthenticated} />
                    <Login />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  user ? (
                    <Navigate to="/" />
                  ) : (
                    // <Signup setIsAuthenticated={setIsAuthenticated} />
                    <Signup />
                  )
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
