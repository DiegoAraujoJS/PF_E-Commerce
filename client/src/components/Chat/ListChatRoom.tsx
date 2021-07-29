import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { UserChat } from "./Chat";
import style from "./Chat.module.css";
import ChatRoom from "./ChatRoom";
import axios from "axios";
import profilePicture from "../../images/profile_pic.svg";

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
      if (userSelected) {
        foundChatUser();
        if (!receivingUser) {
          getReceivingUser(userSelected);
        }
      } else {
        setChatSelected(chatRoom[0]);
        if (!receivingUser && chatRoom.length) {
          chatRoom[0].users.forEach((user) => {
            if (user !== props.userLoged.mail) {
              getReceivingUser(user);
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, chatRoom, userSelected, receivingUser]);

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

  function handleChange(e) {
    if (e.target.value) {
      setUserSelected(e.target.value);
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

  const addChatRoom = async () => {
    const query = await chatsRoomsRef.where(
      "users",
      "array-contains",
      props.userLoged.mail
    );

    let idFounded = "";

    const result = await query.get();
    result.docs.map(async (doc, i) => {
      const data = await doc.data();
      data.users.forEach((user) => {
        if (user === userSelected) {
          idFounded = doc.id;
        }
      });
    });

    await idFounded;

    if (idFounded !== "") {
      console.log("no se puede agregar un chat que ya está creado");
    } else if (userSelected) {
      const chatResponse = await chatsRoomsRef.add({
        users: [props.userLoged.mail, userSelected],
      });
      const chatResponseData = await (
        await chatsRoomsRef.doc(chatResponse.id).get()
      ).data();
      setChatSelected({ users: chatResponseData.users, id: chatResponse.id });
    } else {
      console.log("seleccione un usuario para agregar");
    }
  };

  return (
    <div className={"w-100 d-flex flex-row justify-content-center"}>
      <div className={"w-50 "}>
        <div className={"d-flex w-100"}>
          {users && (
            <form className={"d-flex w-100"}>
              <select
                name=""
                value={userSelected}
                onChange={handleChange}
                className={
                  "text-light border-0 rounded-0 w-100 px-3 fs-6 " +
                  style.background
                }
              >
                <option value={""} key={-1}>
                  Select User
                </option>
                {users.map((user, i) => {
                  if (user.mail !== props.userLoged.mail) {
                    return (
                      <option value={user.mail} key={i}>
                        {user.name + " " + user.lastName}
                      </option>
                    );
                  }
                })}
              </select>
            </form>
          )}
          <button
            className={"px-4 py-3 bg-secondary text-white border-0"}
            onClick={addChatRoom}
          >
            Añadir
          </button>
        </div>
        <ul className={"list-group border rounded-0 " + style.listChats}>
          {chatRoom &&
            chatRoom.map((chat, i) => {
              return (
                <li
                  className={
                    "list-group-item list-group-item-action d-flex rounded-0 border-end-0 border-start-0"
                  }
                  key={i}
                  onClick={() => handleChatSelected(chat)}
                >
                  <div className="d-flex w-25 justify-content-between">
                    <img
                      alt="alt"
                      src={profilePicture || profilePicture}
                      className={"rounded-circle " + style.imgMessage}
                    />
                  </div>
                  <div className="d-flex w-75 justify-content-between">
                    <div className="d-flex flex-column w-100 justify-content-between">
                      <p className="mb-1">
                        {chat.users.map((user, i) =>
                          user !== props.userLoged.mail ? user : null
                        )}
                      </p>
                      <small className="mb-1 text-truncate">
                        contenido del ultimo mensaje
                      </small>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {receivingUser ? (
        chatSelected && chatSelected.id ? (
          <ChatRoom
            issuingUser={props.userLoged}
            receivingUser={receivingUser}
            chatSelected={chatSelected}
            setChatSelected={setChatSelected}
          />
        ) : (
          "Cargando..."
        )
      ) : (
        "No hay chats abiertos"
      )}
    </div>
  );
}

export default ListChatRoom;
