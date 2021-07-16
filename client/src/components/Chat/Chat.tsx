import { useRef, useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import getCookieValue from "../../cookieParser";
import style from "./Chat.module.css";
import ChatRoom from "./ChatRoom";
import ListChatRoom from "./ListChatRoom";

function Chat() {
  const [userLoged, setUserLoged] = useState();
  const [userReference, setUserReference] = useState({
    mail: "admin@admin.com",
    role: 2,
    name: "Admin",
    lastName: "Admin",
  });

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
      console.log(userResponse.data)
      setUserLoged(userResponse.data);
    };
    getUserLoged();
  }, []);

  return (
    <div className={"container"}>
      {userLoged ? (
        <div className={"d-flex flex-row justify-content-center w-100"}>
          <ListChatRoom
            userLoged={userLoged}
            userReference={userReference}
          />
        </div>
      ) : (
        "no hay usuario logeado"
      )}
    </div>
  );
}

export default Chat;
