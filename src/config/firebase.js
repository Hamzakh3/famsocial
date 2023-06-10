// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { groups } from "../helpers/constant";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();

export const db = getFirestore(app);

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
    const q = query(collection(db, "Folders"), where("myId", "in", groups));
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

export const addContact = async (number, id) => {
  const newContact = doc(collection(db, "Contacts", "famSocialContacts", id));
  return await setDoc(newContact, {
    name: number,
    phoneNumber: number,
    user: id,
    id: newContact.id,
  })
    .then((snap) => {
      return true;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};

export const sendMessage = (groupdId, message, userid) => {
  const chatRef = doc(collection(db, "Chats", groupdId, "messages"));
  setDoc(chatRef, {
    msg: message,
    chatId: chatRef.id,
    senderId: userid,
    createdAt: Timestamp.fromDate(new Date()).seconds,
  });
  return true;
};

// export const testing = async (groupId) => {
//   try {
//     const querySnapshot = doc(db, "Chats", "h7UhM6sU8p3Q9UnWX2Ml")
//     await updateDoc(querySnapshot, {
//       messages: deleteField()
//     })
//     return true;
//   } catch (e) {
//     console.error(e);
//   }
// };

// testing();
// addContact("923130987654")
// 923011234567
// ZupVvb4GwXEgaViskvZa
// "ubtppkMJ4NPeN40iafqB"
