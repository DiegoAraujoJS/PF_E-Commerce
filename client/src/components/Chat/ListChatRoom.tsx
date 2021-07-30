import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { UserChat } from "./Chat";
import style from "./Chat.module.css";
import ChatRoom from "./ChatRoom";
import axios from "axios";
import profilePicture from "../../images/profile_pic.svg";
import ChatRoomEmpty from "./ChatRoomEmpty";

interface PropsChat {
  userLoged: UserChat;
  userReference: string;
}
interface ChatData {
  users: Array<string>;
  id: string;
}

function ListChatRoom(props: React.PropsWithChildren<PropsChat>) {
  const [chatSelected, setChatSelected] = useState<ChatData>({
    users: [],
    id: "",
  });
  const [users, setUsers] = useState<Array<UserChat>>();
  const [userSelected, setUserSelected] = useState<string>(props.userReference);
  const [receivingUser, setReceivingUser] = useState<UserChat>();

  let chatsRoomsRef = firestore.collection("chatsRooms");
  const queryChatsRooms = chatsRoomsRef.where(
    "users",
    "array-contains",
    props.userLoged.mail
  );

  const [chatRoom] = useCollectionData<ChatData>(queryChatsRooms, {
    idField: "id",
  });

  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
    if (chatRoom) {
      if (userSelected && userSelected !== props.userLoged.mail) {
        foundChatUser();
        getReceivingUser(userSelected);
      } else {
        setChatSelected(chatRoom[0]);
        if (chatRoom.length) {
          chatRoom[0].users.forEach((user) => {
            if (user !== props.userLoged.mail) {
              getReceivingUser(user);
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, chatRoom, userSelected]);

  async function getAllUsers() {
    try {
      const response = await axios.get("http://localhost:3001/api/usuarios");
      let users: Array<UserChat> = response.data.map((user) => {
        return {
          mail: user.User_mail,
          name: user.name,
          lastName: user.lastName,
          photo: user.foto,
        };
      });
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReceivingUser(userMail) {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/usuarios/" + userMail
      );
      const user = {
        mail: response.data.User_mail,
        name: response.data.name,
        lastName: response.data.lastName,
        photo: response.data.foto,
      };
      setReceivingUser(user);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function foundChatUser() {
    let chatFounded = null;
    chatRoom.map((chat) => {
      return chat.users.map((user) => {
        if (user === userSelected) {
          return (chatFounded = chat);
        }
      });
    });

    if (chatFounded) {
      setChatSelected(chatFounded);
    } else {
      await chatsRoomsRef.add({
        users: [props.userLoged.mail, userSelected],
      });
    }
  }

  
  async function handleChatSelected(chat: ChatData) {
    setChatSelected(chat);
    let userFound = "";
    chat.users.forEach((user) => {
      if (user !== props.userLoged.mail) {
        return (userFound = user);
      }
    });
    setUserSelected(userFound);
    getReceivingUser(userFound);
  }
  console.log(receivingUser)

  return (
    <div className={"w-100 d-flex flex-row justify-content-center"}>
      <div className={"w-50 "}>
        <nav className={"navbar " + style.background}>
          <div
            className={
              "w-100 d-flex flex-row justify-content-start align-items-center"
            }
          >
            <p className={"py-2 text-white w-100 text-center fs-6 m-0"}>
              Lista de chats
            </p>
          </div>
        </nav>
        <ul className={"list-group border rounded-0 " + style.listChats}>
          {chatRoom &&
            chatRoom.map((chat, i) => {
              let receivingUser: UserChat;
              chat.users.map(async (user, i) => {
                if (user !== props.userLoged.mail) {
                  users.map((u) => {
                    if (user === u.mail) {
                      receivingUser = u;
                    }
                  });
                }
              });

              return (
                <li
                  className={
                    "list-group-item list-group-item-action d-flex rounded-0 border-end-0 border-start-0"
                  }
                  key={i}
                  onClick={() => handleChatSelected(chat)}
                  style={{cursor: "pointer"}}
                >
                  <div className="d-flex w-25 justify-content-between">
                    <img
                      alt="alt"
                      src={receivingUser?.photo || profilePicture}
                      className={"rounded-circle " + style.imgMessage}
                    />
                  </div>
                  <div className="d-flex w-75 justify-content-between">
                    <div className="d-flex flex-column w-100 justify-content-between">
                      <p className="mb-1">
                        {receivingUser?.name + " " + receivingUser?.lastName}
                      </p>
                      <small className="mb-1 text-truncate text-secondary">
                        contenido del ultimo mensaje
                      </small>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {receivingUser && receivingUser.mail ? (
        chatSelected && chatSelected.id ? (
          <ChatRoom
            issuingUser={props.userLoged}
            receivingUser={receivingUser}
            chatSelected={chatSelected}
            setChatSelected={setChatSelected}
          />
        ) : (
          <ChatRoomEmpty message={"Cargando..."}/>
        )
      ) : (
        <ChatRoomEmpty message={"No hay chat abiertos"}/>
      )}
    </div>
  );
}

export default ListChatRoom;
