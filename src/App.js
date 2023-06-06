import styled from "styled-components";
import "./App.css";
import chat from "./assets/chat.svg";

import { SideBar, Chats, MessageBox } from "./components/Sidebar";
import InfoWithImage from "./components/InfoWithImage";
import { useEffect } from "react";
import { getGroupsChat, groupsChats } from "./config/firebase";
import { useState } from "react";
import SubscribeModal from "./components/SubscribeModal";
const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 300px 1fr;
`;

function App() {
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getGroups();
  }, [group, open]);

  useEffect(() => {
    showModal();
  }, []);
  const fetchGroupChats = async (groupId) => {
    console.log(groupId);
    const data = await getGroupsChat(groupId);
    setGroup(data);
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
          <img src={chat} alt="" width="25" height="" />
        </div>
        <ul className="links">
          <li className="link">
            <div className="circle"></div>
            <img src={chat} alt="" width="15" height="" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <img src={chat} alt="" width="15" height="" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <img src={chat} alt="" width="15" height="" />
          </li>
          <li className="link">
            <div className="circle"></div>
            <img src={chat} alt="" width="15" height="" />
          </li>
        </ul>

        <ul className="bottomLinks links">
          <li className="link">
            <img src={chat} alt="" width="20" />
          </li>
          <li className="link">
            <img src={chat} alt="" width="22" />
          </li>
        </ul>
      </SideBar>

      <Chats>
        <div className="chatsHead">
          <h1>Chats</h1>
          <button className="iconBtn">
            <img src={chat} alt="Chat" width="15px" height="" />
          </button>
          <button className="iconBtn">
            <img src={chat} alt="Chat" width="15px" height="" />
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
                  groupId={val.id}
                  data={val}
                  setGroup={fetchGroupChats}
                />
              );
            })}
        </ul>
      </Chats>

      <MessageBox>
        <div className="header">
          {group?.length > 0 && <InfoWithImage data={group[0]} />}

          <div className="buttonsGroup">
            <button className="iconBtn">
              <img src={chat} alt="Chat" width="15px" height="" />
            </button>
            <button className="iconBtn">
              <img src={chat} alt="Chat" width="15px" height="" />
            </button>
            <button className="iconBtn">
              <img src={chat} alt="Chat" width="15px" height="" />
            </button>
          </div>
        </div>

        <div className="converstaionBox">
          <ul className="conversations">
            {group &&
              group.length > 0 &&
              group.map((mesg, ind) => {
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
            <img src={chat} alt="" width="12px" height="" />
          </button>

          <input
            type="text"
            name="conversation"
            id="conversation"
            placeholder="type your message here ..."
          />
          <button className="iconBtn">
            <img src={chat} alt="" width="12px" height="" />
          </button>
          <button className="iconBtn">
            <img src={chat} alt="" width="12px" height="" />
          </button>
        </div>
      </MessageBox>
      <SubscribeModal open={open} closeHandler={closeHandler} />
    </Container>
  );
}

export default App;
