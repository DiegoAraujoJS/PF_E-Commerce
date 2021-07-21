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
  userReference: UserChat;
}
interface ChatData {
  users: Array<UserChat>;
  id: string;
}

function ListChatRoom(props: React.PropsWithChildren<PropsChat>) {
  const [chatSelected, setChatSelected] = useState<ChatData>({
    users: [],
    id: "",
  });
  const [users, setUsers] = useState<Array<UserChat>>();
  const [userSelected, setUserSelected] = useState(0);

  let chatsRoomsRef = firestore.collection("chatsRooms");
  const queryChatsRooms = chatsRoomsRef.where(
    "users",
    "array-contains",
    props.userLoged
  );

  const [chatRoom] = useCollectionData<ChatData>(queryChatsRooms, {
    idField: "id",
  });

  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
    if (chatRoom) {
      console.log("Hay un chatRoom");
      setChatSelected(chatRoom[userSelected]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, chatRoom]);

  async function getAllUsers() {
    try {
      const users = await axios.get("http://localhost:3001/api/usuarios");
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    if (e.target.value >= 0) {
      setUserSelected(e.target.value);
    }
  }

  const addChatRoom = async () => {
    const query = await chatsRoomsRef.where(
      "users",
      "array-contains",
      props.userLoged
    );

    let idFounded = "";

    const result = await query.get();
    result.docs.map(async (doc, i) => {
      const data = await doc.data();
      data.users.forEach((user) => {
        if (user.mail === users[userSelected].mail) {
          idFounded = doc.id;
        }
      });
    });

    await idFounded;

    if (idFounded !== "") {
      console.log("no se puede agregar un chat que ya está creado");
    } else {
      await chatsRoomsRef.add({
        users: [props.userLoged, users[userSelected]],
      });
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
                <option value={-1} key={-1}>
                  Select User
                </option>
                {users.map((user, i) => {
                  if (user.mail !== props.userLoged.mail) {
                    return (
                      <option value={i} key={i}>
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
                  onClick={() => setChatSelected(chat)}
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
                          user.mail !== props.userLoged.mail
                            ? user.name + " " + user.lastName
                            : null
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
      {chatSelected && chatSelected.id ? (
        <ChatRoom
          userLoged={props.userLoged}
          users={chatSelected.users}
          id={chatSelected.id}
          setChatSelected={setChatSelected}
        />
      ) : (
        "Cargando..."
      )}
    </div>
  );
}

export default ListChatRoom;
