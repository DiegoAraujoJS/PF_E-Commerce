import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import { UserChat } from './Chat';
import style from "./Chat.module.css";
import ChatMessage from "./ChatMessage";
import profilePicture from "../../images/profile_pic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

interface ChatData {
  users: Array<string>;
  id: string;
}

interface ChatRoomData {
  chatSelected: {
    users: Array<string>;
    id: string;
  };
  issuingUser: UserChat;
  receivingUser: UserChat;
  setChatSelected: React.Dispatch<React.SetStateAction<ChatData>>;
}

export default function ChatRoom(props: React.PropsWithChildren<ChatRoomData>) {
  const dummy: any = useRef();

  let messagesRef = firestore
    .collection("chatsRooms")
    .doc(props.chatSelected.id)
    .collection("messages");
  const queryMessages = messagesRef.orderBy("createdAt", "desc");
  const [messages] = useCollectionData(queryMessages, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: props.issuingUser.mail,
      name: props.issuingUser.name,
    });

    setFormValue("");
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  };
  function dummyCurrent() {
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="App w-100">
        <nav className={"navbar " + style.background}>
          <div
            className={
              "w-100 d-flex flex-row justify-content-start align-items-center"
            }
          >
            <img
              src={props.receivingUser.photo || profilePicture}
              className={"rounded-circle mx-3 " + style.imgMessage}
              alt="profile"
            />
            <span className="text-white fs-5 ">
              {props.receivingUser.name + " " + props.receivingUser.lastName}
            </span>
          </div>
        </nav>

        <section
          className={"d-flex flex-column justify-content-center bg-light"}
        >
          <main
            className={
              "d-flex flex-column-reverse justify-content-start p-3 border " +
              style.main
            }
          >
            <span ref={dummy}></span>
            <FontAwesomeIcon
              className={"position-fixed text-secondary "}
              icon={faChevronCircleDown}
              size={"2x"}
              onClick={dummyCurrent}
            />
            {messages &&
              messages.map((msg: any, i) => (
                <ChatMessage
                  key={i}
                  message={{ ...msg, issuingUser: props.issuingUser, receivingUser: props.receivingUser  }}
                />
              ))}
          </main>

          <form onSubmit={sendMessage} className={"d-flex bg-dark w-100"}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Envia un mensaje"
              className={"border rounded-0 w-100 px-3 fs-6 bg-light "}
            />

            <button
              type="submit"
              disabled={!formValue}
              className={"px-4 py-3 bg-secondary border-0"}
            >
              <FontAwesomeIcon icon={faPaperPlane} size={"1x"} />
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
