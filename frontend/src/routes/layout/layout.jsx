import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

function RequiredAuth () {

  const { currentUser} = useContext(AuthContext);

 

 
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(!currentUser){
  //    <Navigate to="/login" />
  //   }
  // },[currentUser, navigate]);

  if(!currentUser) return <Navigate to = "/login" /> ;

   else{

  return (
   

    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
    
  );
}
}
export {Layout, RequiredAuth}
