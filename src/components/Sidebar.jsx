import styled from "styled-components";

const SideBar = styled.div`
  border-right: 1px solid whitesmoke;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100dvh;
  align-items: center;
  padding-block: 24px;
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .link {
      padding: 8px;
      transition: 0.3s all ease-in-out;
      position: relative;

      &:hover {
        border-radius: 8px;
        transition: 0.3s all ease-in-out;
        background-color: lightgray;
      }
    }
  }

  .bottomLinks {
    margin-block: auto 0px;
  }
`;

const Chats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-block: 16px;

  .chatsHead {
    display: flex;
    gap: 8px;
    padding-inline: 16px;
    justify-content: flex-end;
    h1 {
      margin-inline: 0px auto;
    }
    .iconBtn {
      padding: 12px;
      border: 1px solid whitesmoke;
      cursor: pointer;
      background: white;
    }
  }

  .txtSearch {
    padding: 8px 16px;
    border: 1px solid whitesmoke;
    border-radius: 4px;
    margin-inline: 16px;
  }

  .chatList {
    display: flex;
    flex-direction: column;
  }
`;

const MessageBox = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-left: 1px solid whitesmoke;

  .header {
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

    .buttonsGroup {
      display: flex;
      gap: 8px;
    }
  }
  .converstaionBox {
    border-bottom: 1px solid whitesmoke;
    padding: 8px 16px;
    .conversations {
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      padding-block: 8px;
      max-height: 70dvh;

      .message {
        display: flex;
        gap: 8px;
        max-width: 80%;
        img {
          border-radius: 100px;
        }
        p {
          padding: 8px;
          background: whitesmoke;
          border-radius: 4px;
        }
      }

      .right {
        align-self: flex-end;
      }

      .left {
        align-self: flex-start;
      }
    }
  }
  .inputBox {
    display: flex;
    padding: 8px 16px;
    width: 100%;
    gap: 8px;

    input {
      flex: 1;
      border-radius: 4px;
      border: 1px solid whitesmoke;
      padding: 8px 16px;
    }
  }

  .iconBtn {
    padding: 12px;
    border: 1px solid whitesmoke;
    cursor: pointer;
    background: white;
  }
`;

export { SideBar, Chats, MessageBox };
