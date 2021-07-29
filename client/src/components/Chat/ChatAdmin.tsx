import React, { useRef, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import { UserChat } from "./Chat";
import ChatRoomAdmin from "./ChatRoomAdmin";

interface ChatData {
  users: Array<UserChat>;
  id: string;
}

interface ChatAdminProps {
  admin: UserChat,
  user: UserChat,
}
export default function ChatAdmin(props: React.PropsWithChildren<ChatAdminProps>) {
  const dummy: any = useRef();

  let chatsRoomsRef = firestore.collection("chatsRooms");
  const queryChatsRooms = chatsRoomsRef.where(
    "users",
    "array-contains",
    props.admin
  );

  const [chatRoom] = useCollectionData<ChatData>(queryChatsRooms, {
    idField: "id",
  });

  const [chatSelected, setChatSelected] = useState<ChatData>({
    users: [],
    id: "",
  });

  useEffect(() => {
    if (chatRoom) {
      foundChatUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  async function foundChatUser() {
    let chatFounded = null;
    chatRoom.map((chat) => {
      return chat.users.map((user) => {
        if (user.mail === props.user.mail) {
          return chatFounded = chat;
        }
      });
    });

    if (chatFounded) {
      setChatSelected(chatFounded);
    } else {
      await chatsRoomsRef.add({
        users: [props.admin, props.user],
      });
    }
  }

  return (
    <>
      {chatSelected && chatSelected.id ? (
        <ChatRoomAdmin
          userLoged={props.admin}
          users={chatSelected.users}
          id={chatSelected.id}
          setChatSelected={setChatSelected}
        />
      ) : (
        "Cargando..."
      )}
    </>
  );
}
