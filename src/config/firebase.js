// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { groupIds } from "../helpers/constant";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
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

export async function groupsChats() {
  const request = groupIds.map(({ id }) => {
    const q = query(collection(db, "Chats", id, "messages"), limit(1));
    return q;
  });

  const groups = [];

  for(let i=0; i< request.length; i++){
    const snap = await getDocs(request[i]);
    snap.forEach(doc => {
      const data = doc.data();
      groups.push({
        groupImage: data?.groupImage ? data.groupImage : "" ,
        profile: data?.profile ? data.profile : "",
        id: data.chatId
      });
    });
  }
  return groups;
}

// Not Working this function because groupd ids data cant get may be permission issues or something else.
// export async function groupsChats() {
//   const chatRef = collection(db, "Chats");
//   const q = query(chatRef, where(documentId(), 'in', groupIds))
//   const querySnapshot = await getDocs(q)

//   querySnapshot.docs.map((doc) => {
//     console.log({ id: doc.id, data: doc.data() });
//   });
// }
