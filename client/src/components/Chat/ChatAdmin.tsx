import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { UserChat } from "./Chat";
import ChatRoomAdmin from "./ChatRoomAdmin";

interface ChatData {
  users: Array<string>;
  id: string;
}

interface ChatAdminProps {
  admin: UserChat;
  user: UserChat;
}
export default function ChatAdmin(
  props: React.PropsWithChildren<ChatAdminProps>
) {

  let chatsRoomsRef = firestore.collection("chatsRooms");
  const queryChatsRooms = chatsRoomsRef.where(
    "users",
    "array-contains",
    props.admin.mail
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
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  async function foundChatUser() {
    let chatFounded = null;
    chatRoom.map((chat) => {
      return chat.users.map((user) => {
        if (user === props.user.mail) {
          return (chatFounded = chat);
        }
        return null;
      });
    });

    if (chatFounded) {
      setChatSelected(chatFounded);
    } else {
      await chatsRoomsRef.add({
        users: [props.admin.mail, props.user.mail],
      });
    }
  }

  return (
    <>
      {chatSelected && chatSelected.id ? (
        <ChatRoomAdmin
          issuingUser={props.admin}
          receivingUser={props.user}
          chatSelected={chatSelected}
          setChatSelected={setChatSelected}
        />
      ) : (
        "Cargando..."
      )}
    </>
  );
}
