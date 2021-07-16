import React, { useRef, useState } from "react";
import "./Chat.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import { UserProps } from "../../../../interfaces";
import style from "./Chat.module.css";
import ChatMessage from './ChatMessage';

function unificar(mail1, mail2) {
  let orden;
  if (mail1 < mail2) {
    orden = mail1 + "-" + mail2;
  } else {
    orden = mail2 + "-" + mail1;
  }
  return orden;
}

interface ChatRoomData {
  userLoged: UserProps;
  users: Array<UserProps>;
  id: string;
}

export default function ChatRoom(props: React.PropsWithChildren<ChatRoomData>) {
  const dummy: any = useRef();

  let messagesRef = firestore.collection("chatsRooms").doc(props.id).collection("messages");
  const queryMessages = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(queryMessages, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: props.userLoged.mail,
      photoURL:
        "https://tse3.mm.bing.net/th/id/OIP.sFI4WGRjHM9popoUUwLgdwAAAA?pid=ImgDet&w=260&h=280&rs=1",
    });

    setFormValue("");
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="App w-100">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container text-white fs-5">{props.users.map( (user) => (user.mail !== props.userLoged.mail) ? user.name: "")}</div>
        </nav>
        <section
          className={"d-flex flex-column justify-content-center bg-light"}
        >
          <main className={"p-3 d-flex flex-column " + style.main}>
            {messages &&
              messages.map((msg: any, i) => (
                <ChatMessage
                  key={i}
                  message={{ ...msg, user: props.userLoged.mail }}
                />
              ))}
            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className={"d-flex bg-dark w-100"}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Envia un mensaje"
              className={
                "bg-dark text-light border-0 rounded-0 w-100 px-3 fs-6"
              }
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
