import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import getCookieValue from "../../cookieParser";
import { UserProps } from "../../../../interfaces";
import style from "./Chat.module.css";

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
        <ChatRoom userLoged={userLoged} userReference={"admin@admin.com"} />
      ) : (
        "no hay usuario logeado"
      )}
    </div>
  );
}

function unificar(mail1, mail2) {
  let orden;
  if (mail1 < mail2) {
    orden = mail1 + "-" + mail2;
  } else {
    orden = mail2 + "-" + mail1;
  }
  return orden;
}

interface PropsChat {
  userLoged: UserProps;
  userReference: String;
}

function ChatRoom(props: React.PropsWithChildren<PropsChat>) {
  const dummy: any = useRef();

  let messagesRef = firestore.collection(
    unificar(props.userLoged.mail, props.userReference)
  );

  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: props.userLoged.mail,
      photoURL: "http://picsum.photo/200",
    });

    setFormValue("");
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container text-white fs-5">{props.userReference}</div>
        </nav>
        <section
          className={"d-flex flex-column justify-content-center bg-light"}
        >
          <main className={"p-3 d-flex flex-column " + style.main}>
            {messages &&
              messages.map((msg: any, i) => (
                <ChatMessage
                  key={i}
                  message={{...msg,  user:props.userLoged.mail}}
                />
              ))}
            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className={"d-flex bg-dark w-100"}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Envia un mensaje"
              className={"bg-dark text-light border-0 rounded-0 w-100 px-3 fs-6"}
            />

            <button
              type="submit"
              disabled={!formValue}
              className={"px-4 py-3 bg-secondary border-0"}
            >
              🕊️
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, user } = props.message;

  const messageClass = uid === user ? "sent" : "received";

  return (
    <>
      {messageClass === "sent" ? (
        <div className={"d-flex align-items-center flex-row-reverse py-2"}>
          <img
            alt="alt"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            className={"rounded-circle p-1 " + style.imgMessage}
          />
          <span className={"badge rounded-pill bg-secondary fs-6 text-wrap text-break mw-100"}>{text}</span>
        </div>
      ) : (
        <div className={"d-flex align-items-center flex-row  py-2"}>
          <img
            alt="alt"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            className={"rounded-circle p-1 " + style.imgMessage}
          />
          <span className={"badge rounded-pill bg-secondary fs-6 text-wrap text-break mw-100"}>{text}</span>
        </div>
      )}
    </>
  );
}

export default Chat;
