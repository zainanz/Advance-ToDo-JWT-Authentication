import { useSelector, useDispatch } from "react-redux";
import "./navbar.css"
import "../color.css"
import { logout } from "../../app/store/authSlice";
import { useNavigate } from "react-router-dom"
function Navbar(){
  const navigate = useNavigate();
  const userdata = useSelector( state => state.auth)
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className=" align-items-center d-flex justify-content-between align-items-start px-5 secondary-bg">
      <p className="fw-bold fs-5 important-color">{userdata.user.username}</p>
      {
       userdata.isLoggedIn ?
          (<button onClick={handleLogOut} className="logout-btn important-bg">
            Log out
          </button>) : ""

       }

    </div>
  )
}


export default Navbar;
