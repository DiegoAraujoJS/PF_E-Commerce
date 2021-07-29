import React from "react";
import style from "./Chat.module.css";
import profilePicture from "../../images/profile_pic.svg";

export default function ChatMessage(props) {
  const { text, uid, createdAt, receivingUser, issuingUser } = props.message;

  const messageClass = uid === issuingUser.mail ? "sent" : "received";
  
  return (
    <>
      {messageClass === "sent" ? (
        <div className={"align-self-end my-1 "}>
          <div className={"d-flex align-items-center"}>
            <span
              className={
                "d-inline-block bg-white px-3 py-2 me-1 rounded-3 shadow fs-6 text-wrap text-break"
              }
            >
              {text}
            </span>
            <img
              alt="alt"
              src={issuingUser.photo || profilePicture}
              className={"rounded-circle shadow " + style.imgMessage}
            />
          </div>
          <div className={"d-flex justify-content-start ms-4"}>
            <small className={"text-secondary"}>
              
            </small>
          </div>
        </div>
      ) : (
        <div className={"align-self-start my-1 "}>
          <div className={"d-flex align-items-center"}>
            <img
              alt="alt"
              src={receivingUser.photo || profilePicture}
              className={"rounded-circle shadow " + style.imgMessage}
            />
            <span
              className={
                "d-inline-block bg-white px-3 py-2 ms-1 rounded-3 shadow fs-6 text-wrap text-break"
              }
            >
              {text}
            </span>
          </div>
          <div className={"d-flex justify-content-end me-4"}>
            <small className={"text-secondary"}>
            
            </small>
          </div>
        </div>
      )}
    </>
  );
}
