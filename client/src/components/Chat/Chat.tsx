import { useRef, useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import getCookieValue from "../../cookieParser";
import style from "./Chat.module.css";
import ChatRoom from "./ChatRoom";
import ListChatRoom from "./ListChatRoom";
import image from "../../images/login.svg";

export interface UserChat {
  mail: string;
  name: string;
  lastName: string;
}

function Chat() {
  const [userLoged, setUserLoged] = useState<UserChat>();
  const [userReference, setUserReference] = useState({
    mail: "admin@admin.com",
    name: "Admin",
    lastName: "Admin",
    city: "Buenos Aires"
  });

  useEffect(() => {
    if (!userLoged) {
      getUserLoged();
    }
  }, []);

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
    const user: UserChat = {
      mail: userResponse.data.mail,
      name: userResponse.data.name,
      lastName: userResponse.data.lastName,
    };
    setUserLoged(user);
  };

  return (
    <div className={"mt-5 mx-auto " + style.chatContainer}>
      {userLoged ? (
        <div className={"d-flex flex-row justify-content-center w-100"}>
          <ListChatRoom userLoged={userLoged} userReference={userReference} />
        </div>
      ) : (
        <div className={"d-flex flex-column justify-content-center align-items-center"}>
          <h1 className={"mb-5"}>No hay un usuario logeado</h1>
          <img className={"w-75"} src={image} alt="Login" />
        </div>
      )}
    </div>
  );
}

export default Chat;
