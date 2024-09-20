import { useSelector } from "react-redux";
import "./navbar.css"

function Navbar(){
  const userdata = useSelector( state => state.auth)
  return (
    <div className="navbar d-flex justify-content-button px-5">
      <p className="fw-bold fs-5">{userdata.user[0] || ""}</p>
      {
       userdata.isLoggedIn ?
          (<button className="btn btn-secondary">
            Log out
          </button>) : ""

       }

    </div>
  )
}


export default Navbar;
