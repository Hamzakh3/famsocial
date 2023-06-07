// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { groups } from "../helpers/constant";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcuUp-0gxbSslM0JXR6pLlEFLXV3SlKbk",
  authDomain: "familybuild-b496f.firebaseapp.com",
  projectId: "familybuild-b496f",
  storageBucket: "familybuild-b496f.appspot.com",
  messagingSenderId: "242352768570",
  appId: "1:242352768570:web:31c7948bef194527431703",
  measurementId: "G-Q1P66W6DE2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);

export const getGroupsChat = async (groupId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "Chats", groupId, "messages")
    );
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const groupsChats = async () => {
  try {
    const q = query(collection(db, "Folders"), where('myId', 'in', groups))
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
