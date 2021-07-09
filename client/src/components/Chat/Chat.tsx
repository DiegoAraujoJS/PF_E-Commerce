import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";
// import axios from "axios";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore, loginWithGoogle, signOut } from '../../firebase';
import firebase from 'firebase/app';



function Chat(props) {
  const [user] = useAuthState(auth);
  // console.log(user);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  
  return (
    <>
      <button className="sign-in" onClick={loginWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={signOut}>
        Sign Out
      </button>
    )
  );
}

function unificar (mail1, mail2) {
  let orden;
  if (mail1<mail2) {orden= mail1+'-'+mail2}
  else {orden = mail2+'-'+mail1}
  return orden
}

function ChatRoom() {
  const dummy: any = useRef();
  // const messagesRef = firestore.collection("messages");
  const [user] = useAuthState(auth);

  let messagesRef = firestore.collection(unificar("diegolaraujo96@gmail.com", "benjaminspiecker@gmail.com" ));

  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  // const [messages, setMessages] = useState([]);

  const [formValue, setFormValue] = useState("");

  // useEffect( () => {
    
  //   getMessages()
    
  // }, [])
    
  // const getMessages = async() => {
  //   const response = await axios.get("http://localhost:3001/api/chats");
  //    setMessages(response.data);
  // }
  // const setMessage = async () => {

  // }

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg:any, i) => <ChatMessage key={i} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Envia un mensaje"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default Chat;

/* Chat: [
  {
    id: "uid",
    name: "email1-email2",
    data: [
      {
        uid: "uid",
        photoURL: "http://...",
        text: "hola soy un mensaje",
        createdAt: Date
      }
    ]
  }
] */