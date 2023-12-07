import { Link} from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {


  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  // console.log(isAuthenticated);
  
  const handleClick = () => {

  logout();
}

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {user && (
            <div>
              {/* <span>{JSON.parse(localStorage.getItem("user")).email}</span> */}
              <span>{user.email}</span>
              {/* <Link to="/login"><button onClick={()=>{localStorage.removeItem("user");localStorage.removeItem("token");setIsAuthenticated(false);navigate("/login")}}>Log out</button></Link> */}
              <Link to="/login"><button onClick={handleClick}>Log out</button></Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
