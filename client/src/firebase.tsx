import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDGqKZu8WjUjyjurueAHUhooogWltFdcwM",
    authDomain: "auth-4d665.firebaseapp.com",
    databaseURL: "https://auth-4d665.firebaseio.com",
    projectId: "auth-4d665",
    storageBucket: "auth-4d665.appspot.com",
    messagingSenderId: "817622282057",
    appId: "1:817622282057:web:341e90c00d9d84b1483498",
    measurementId: "G-QVJFDGG499",
  }

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const firebaseAuth = async (provider) => {
  try {
    const response = await firebase.auth().signInWithPopup(provider);
    
    return response;
  } catch (error) {
    
    return error;
  }
}

export const createUser = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential;
  } catch (error) {
    return error;
  }
}
export const signIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    
    return userCredential;
  } catch (error) {
    return error;
  }
}
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    
    return 'correct logout';
  } catch (error) {
    return error;
  } 
}
export const changePassword = async (newPassword) => {
  try {
    return await firebase.auth().currentUser.updatePassword(newPassword);
  } catch (error) {
    return error;
  }
}
export const deleteUser = async (user) => {
  try {
    return await user.delete();
  } catch (error) {
    return error;
  } 
}
export const loginWithGoogle = () => firebaseAuth(googleProvider);

// use hook const [user] = useAuthState(auth)
// use auth.cuurentUser to get the current user
export const auth = firebase.auth();

// create firestoreRef = firestore.collection("nameOfCollection")
// create query =  firestoreRef.orderBy("createdAt").limit(25);
// use hook const [data] = useCollectionData(query, { idField: "id" });
export const firestore = firebase.firestore();