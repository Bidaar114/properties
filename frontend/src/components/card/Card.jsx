import { Link, useNavigate, } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiReq";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Card({ item }) {





  const [saved, setSaved] = useState(item.isSaved);
  const navigate = useNavigate();



  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save",  { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  
   const handleSend = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK

    try {
      await apiRequest.post("/chats", {receiverId: item.userId});  

      navigate("/profile");
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt=""  onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}/>
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" onClick={handleSend}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
