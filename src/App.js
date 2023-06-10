import styled from "styled-components";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, sendMessage } from "./config/firebase";
import { SideBar, Chats, MessageBox } from "./components/Sidebar";
import InfoWithImage from "./components/InfoWithImage";
import { useEffect } from "react";
import { getGroupsChat, groupsChats } from "./config/firebase";
import { useState } from "react";
import SubscribeModal from "./components/SubscribeModal";
import MessageIcon from "@mui/icons-material/Message";
import loader from "./assets/loading.svg";
import user from "./assets/user.png";

import {
  AccountCircle,
  ChatBubble,
  DeleteOutline,
  Person,
  StarBorder,
  BedtimeOutlined,
  LinearScaleOutlined,
  VideoCallOutlined,
  PhoneOutlined,
  GroupOutlined,
  AddCircleOutlineOutlined,
  AttachFileOutlined,
  SendOutlined,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";
import { useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 300px 1fr;
`;

const BoxMessage = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
  h2 {
    color: lightgray;
  }
`;

function App() {
  const [chats, setGroupChats] = useState();
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ifNoChats, setIfNoChats] = useState("");
  const [userid, setUserId] = useState();
  const [message, setMessage] = useState("");
  const chatList = useRef();

  useEffect(() => {
  }, [chats, open, ifNoChats, chatList]);

  useEffect(() => {
    if (group) {
      const docRef = collection(db, "Chats", group.myId, "messages");
      // const q = query(docRef, orderBy("createdAt"))
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        data = data.sort((a , b) => {
            return a.createAt - b.createAt
        })
        setGroupChats(data);
        scollToBottom()
      });

      return () => {
        unsubscribe();
      };
    }
  }, [group]);

  useEffect(() => {
    getGroups();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUserId(uid);
      } else {
        showModal();
      }
    });
  }, []);

  const scollToBottom = () => {
    const current = chatList.current
    const chatUlList = current.childNodes[0]
    const lastMessage = chatUlList.lastChild
    
    lastMessage.scrollIntoView({behavior: 'smooth'});
  }

  const fetchGroupChats = async (groupId, groupDetail) => {
    setLoading(true);
    const data = await getGroupsChat(groupId);

    // const unsub =
    setGroupChats(data);
    setGroup(groupDetail);
    setLoading(false);
    data.length === 0 && setIfNoChats("No Chats available in this group");
  };

  const getGroups = async () => {
    const groupsName = await groupsChats();
    setGroups(groupsName);
    setIfNoChats("Select any Group for send and read messages");
  };

  const showModal = (imidiate) => {
    if (imidiate) {
      setOpen(true);
    } else {
      setTimeout(() => {
        setOpen(true);
      }, 5000);
    }
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const sendMesgHandler = () => {
    !userid && showModal("imidiate");
    if (message.trim().length > 0 && userid) {
      sendMessage(group.myId, message, userid);
      setMessage("");
    }
  };

  return (
    <Container>
      <SideBar>
        <div className="logo" style={{ color: "black" }}>
          <MessageIcon color="primary" fontSize="large" />
        </div>
        <ul className="links">
          <li className="link">
            <div className="circle"></div>
            <ChatBubble color="" fontSize="small" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <Person color="" fontSize="small" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <StarBorder color="" fontSize="small" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <DeleteOutline color="" fontSize="small" />
          </li>
        </ul>

        <ul className="bottomLinks links">
          <li className="link">
            <BedtimeOutlined color="" fontSize="small" />
          </li>
          <li className="link">
            <AccountCircle color="" fontSize="medium" />
          </li>
        </ul>
      </SideBar>

      <Chats>
        <div className="chatsHead">
          <h1>Chats</h1>
          <button className="iconBtn">
            <GroupOutlined fontSize="small" />
          </button>
          <button className="iconBtn">
            <AddCircleOutlineOutlined fontSize="small" />
          </button>
        </div>
        <input type="search" id="search" name="search" className="txtSearch" />
        <ul className="chatList">
          {groups &&
            groups?.length > 0 &&
            groups.map((val, ind) => {
              return (
                <InfoWithImage
                  key={`group-chat-${ind}`}
                  groupId={val.myId}
                  data={val}
                  setGroup={fetchGroupChats}
                />
              );
            })}
        </ul>
      </Chats>

      <MessageBox>
        <div className="header">
          {group && <InfoWithImage data={group} />}

          <div className="buttonsGroup">
            <button className="iconBtn">
              <PhoneOutlined color="success" fontSize="small" />
            </button>
            <button className="iconBtn">
              <VideoCallOutlined color="warning" fontSize="small" />
            </button>
            <button className="iconBtn">
              <LinearScaleOutlined color="" fontSize="small" />
            </button>
          </div>
        </div>

        <div className="converstaionBox" ref={chatList}>
          {!loading && chats && chats.length > 0 ? (
            <ul className="conversations">
              {chats.map((mesg, ind) => {
                return (
                  <li
                    className={
                      mesg?.senderId && mesg?.senderId === userid
                        ? "right message"
                        : "left message"
                    }
                    key={`message-${ind}`}
                  >
                    {(mesg?.senderId === undefined || mesg.senderId !== userid) && (
                      <img
                        src={mesg?.profileUri ? mesg.profileUri : user}
                        alt="profile_img"
                        width="25px"
                        height="25px"
                      />
                    )}
                    <p>{mesg.msg}</p>
                    {mesg?.senderId && mesg.senderId === userid && (
                      <img
                        src={mesg?.profileUri ? mesg.profileUri : user}
                        alt="profile_img"
                        width="25px"
                        height="25px"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <BoxMessage>
              {!loading ? (
                <h2>{ifNoChats}</h2>
              ) : (
                <img src={loader} alt="" width={"50px"} height={""} />
              )}
            </BoxMessage>
          )}
        </div>

        <div className="inputBox">
          <button className="iconBtn">
            <EmojiEmotionsOutlined fontSize="small" />
          </button>

          <input
            type="text"
            name="conversation"
            id="conversation"
            placeholder="type your message here ..."
            disabled={userid ? false : true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="iconBtn">
            <AttachFileOutlined fontSize="small" />
          </button>
          <button className="iconBtn" onClick={sendMesgHandler}>
            <SendOutlined fontSize="small" />
          </button>
        </div>
      </MessageBox>
      <SubscribeModal open={open} closeHandler={closeHandler} />
    </Container>
  );
}

export default App;
