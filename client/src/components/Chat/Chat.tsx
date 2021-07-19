import { useRef, useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import getCookieValue from "../../cookieParser";
import style from "./Chat.module.css";
import ChatRoom from "./ChatRoom";

function Chat() {
  const [userLoged, setUserLoged] = useState();

  useEffect(() => {
    const getUserLoged = async () => {
      const token = getCookieValue("token").slice(
        1,
        getCookieValue("token").length - 1
      );
      let userResponse = await axios.post(
        `http://localhost:3001/api/verify`,
        {},
        { withCredentials: true, headers: { Authorization: token } }
      );
      setUserLoged(userResponse.data);
    };
    getUserLoged();
  }, []);

  return (
    <div className={style.appContainer}>
      {userLoged ? (
        <ChatRoom userLoged={userLoged} userReference={{mail: "diegoaraujo@gmail.com", role: 2, name: 'Mr Admin', lastName: 'Smith', city:"Buenos Aires" }} />
      ) : (
        "no hay usuario logeado"
      )}
    </div>
  );
}

export default Chat;
