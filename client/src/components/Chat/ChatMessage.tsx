import React from "react";
import  style from "./Chat.module.css";

export default function ChatMessage(props) {
    const { text, uid, photoURL, user } = props.message;
  
    const messageClass = uid === user ? "sent" : "received";
  
    return (
      <>
        {messageClass === "sent" ? (
          <div className={"my-1 bg-light"}>
            <img
              alt="alt"
              src={
                photoURL ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
              className={"rounded-circle p-1 " + style.imgMessage}
            />
            <span className={"fs-6 text-wrap text-break"}>{text}</span>
          </div>
        ) : (
          <div className={"d-flex align-items-center flex-row  my-1"}>
            <img
              alt="alt"
              src={
                photoURL ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }
              className={"rounded-circle p-1 " + style.imgMessage}
            />
            <span className={"fs-6 text-wrap text-break"}>{text}</span>
          </div>
        )}
      </>
    );
  }