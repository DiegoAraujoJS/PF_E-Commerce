import React from "react";
import style from "./Chat.module.css";

export default function ChatMessage(props) {
  const { text, uid, photoURL, createdAt, user } = props.message;

  const messageClass = uid === user ? "sent" : "received";

  return (
    <>
      {messageClass === "sent" ? (
        <div className={"align-self-end my-1 d-flex align-items-center"}>
          <span
            className={
              "d-inline-block bg-white px-3 py-2 me-1 rounded-3 shadow fs-6 text-wrap text-break"
            }
          >
            {text}
          </span>
          <img
            alt="alt"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            className={"rounded-circle shadow " + style.imgMessage}
          />
        </div>
      ) : (
        <div className={"align-self-start my-1 d-flex align-items-center"}>
          <img
            alt="alt"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            className={"rounded-circle me-1 shadow " + style.imgMessage}
          />
          <span
            className={
              "d-inline-block bg-white px-3 py-2 rounded-3 shadow fs-6 text-wrap text-break"
            }
          >
            {text}
          </span>
        </div>
      )}
    </>
  );
}
