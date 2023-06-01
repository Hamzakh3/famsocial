import styled from "styled-components";
import "./App.css";
import chat from "./assets/chat.svg";

import { SideBar, Chats, MessageBox } from "./components/Sidebar";
import InfoWithImage from "./components/InfoWithImage";
const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 300px 1fr;
`;

function App() {
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
          {[1, 2, 3, 4, 5].map((val, ind) => {
            return <InfoWithImage />;
          })}
        </ul>
      </Chats>

      <MessageBox>
        <div className="header">
          <InfoWithImage />

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
            <li className="right message">
              <p>Hello</p>
              <img src={chat} alt="Chat" width="15px" height=""/>
            </li>
            <li className="left message">
              <img src={chat} alt="Chat" width="15px" height=""/>
              <p>Hi How are you</p>
            </li>
          </ul>
        </div>

        <div className="inputBox">
          <button className="iconBtn">
            <img src={chat} alt="" width="12px" height=""/>
          </button>

          <input type="text" name="conversation" id="conversation" placeholder="type your message here ..."/>
          <button className="iconBtn">
            <img src={chat} alt="" width="12px" height=""/>
          </button>
          <button className="iconBtn">
            <img src={chat} alt="" width="12px" height=""/>
          </button>
        </div>
      </MessageBox>
    </Container>
  );
}

export default App;
