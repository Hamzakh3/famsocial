import styled from "styled-components";
import "./App.css";
import { SideBar, Chats, MessageBox } from "./components/Sidebar";
import InfoWithImage from "./components/InfoWithImage";
import { useEffect } from "react";
import { getGroupsChat, groupsChats } from "./config/firebase";
import { useState } from "react";
import SubscribeModal from "./components/SubscribeModal";
import MessageIcon from "@mui/icons-material/Message";

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
const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 300px 1fr;
`;

function App() {
  const [chats, setGroupChats] = useState();
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getGroups();
  }, [chats, open]);

  useEffect(() => {
    showModal();
  }, []);
  const fetchGroupChats = async (groupId, groupDetail) => {
    const data = await getGroupsChat(groupId);
    setGroupChats(data);
    setGroup(groupDetail);
  };

  const getGroups = async () => {
    const groupsName = await groupsChats();
    setGroups(groupsName);
  };

  const showModal = () => {
    setTimeout(() => {
      setOpen(true);
    }, 5000);
  };

  const closeHandler = () => {
    setOpen(false);
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

        <div className="converstaionBox">
          <ul className="conversations">
            {chats &&
              chats.length > 0 &&
              chats.map((mesg, ind) => {
                return (
                  <li className="left message" key={`message-${ind}`}>
                    <img
                      src={mesg?.profileUri ? mesg.profileUri : ""}
                      alt="Chat"
                      width="25px"
                      height="25px"
                    />
                    <p>{mesg.msg}</p>
                  </li>
                );
              })}
          </ul>
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
          />
          <button className="iconBtn">
            <AttachFileOutlined fontSize="small" />
          </button>
          <button className="iconBtn">
            <SendOutlined fontSize="small" />
          </button>
        </div>
      </MessageBox>
      <SubscribeModal open={open} closeHandler={closeHandler} />
    </Container>
  );
}

export default App;
