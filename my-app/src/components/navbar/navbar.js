import { useSelector } from "react-redux";
import "./navbar.css"
import "../color.css"
function Navbar(){
  const userdata = useSelector( state => state.auth)
  return (
    <div className="navbar d-flex justify-content-button px-5 primary-bg">
      <p className="fw-bold fs-5 important-color">{userdata.user.username || ""}</p>
      {
       userdata.isLoggedIn ?
          (<button className="btn btn-secondary important-bg">
            Log out
          </button>) : ""

       }

    </div>
  )
}


export default Navbar;
