import React, { useRef, useState } from "react";
import "./Chat.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDGqKZu8WjUjyjurueAHUhooogWltFdcwM",
  authDomain: "auth-4d665.firebaseapp.com",
  databaseURL: "https://auth-4d665.firebaseio.com",
  projectId: "auth-4d665",
  storageBucket: "auth-4d665.appspot.com",
  messagingSenderId: "817622282057",
  appId: "1:817622282057:web:341e90c00d9d84b1483498",
  measurementId: "G-QVJFDGG499",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Chat(props) {
  const [user] = useAuthState(auth);
  console.log(user);

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
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
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
      <button className="sign-out" onClick={() => auth.signOut()}>
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

  const [formValue, setFormValue] = useState("");

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
          messages.map((msg:any) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
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
