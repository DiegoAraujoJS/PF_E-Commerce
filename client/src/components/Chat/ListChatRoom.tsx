import React, { useRef, useState } from "react";
import "./Chat.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from '../../firebase';
import firebase from "firebase/app";
import { UserProps } from "../../../../interfaces";
import style from "./Chat.module.css";
import ChatMessage from "./ChatMessage";
import ChatRoom from "./ChatRoom";

interface PropsChat {
  userLoged: UserProps;
  userReference: UserProps;
}
interface ChatData {
  users: Array<UserProps>;
  id: string;
}

function ListChatRoom(props: React.PropsWithChildren<PropsChat>) {
  const [chatSelected, setChatSelected] = useState<ChatData>();

  let chatsRoomsRef = firestore.collection("chatsRooms");
  const queryChatsRooms = chatsRoomsRef.where(
    "users",
    "array-contains",
    props.userLoged
  );

  const [chatRoom] = useCollectionData<ChatData>(queryChatsRooms, {
    idField: "id",
  });

  const addChatRoom = async () => {
    const chatRoom = await chatsRoomsRef.add({
      users: [props.userLoged, props.userReference],
    });
    console.log(chatRoom.id);
  };

  return (
    <div
      className={
        "w-100 d-flex flex-row justify-content-center align-items-start"
      }
    >
      <div className={"w-75"}>
        <ul className="list-group">
          {chatRoom &&
            chatRoom.map((chat, i) => {
              return (
                <li
                  className="list-group-item list-group-item-action"
                  key={i}
                  onClick={() => setChatSelected(chat)}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1">
                      {chat.users.map((user, i) => {
                        if (user.mail !== props.userLoged.mail) {
                          return user.name + " " + user.lastName;
                        }
                      })}
                    </p>
                    <small>3 days ago</small>
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="mb-1">contenido del ultimo mensaje</small>
                    {/* <span className="badge bg-primary rounded-pill">{i}</span> */}
                  </div>
                </li>
              );
            })}
          <button onClick={addChatRoom}>agregar chat</button>
        </ul>
      </div>
      {chatSelected && (
        <ChatRoom
          userLoged={props.userLoged}
          users={chatSelected.users}
          id={chatSelected.id}
        />
      )}
    </div>
  );
}

export default ListChatRoom;
