import React from "react";
import styled from "styled-components";
import chat from "../assets/chat.svg"

const List = styled.div`
  display: flex;
  border-bottom: 1px solid whitesmoke;
  padding-inline: 16px;
  padding-block: 16px;
  gap: 8px;

  &:hover {
    background: whitesmoke;
    transition: 0.3s all ease-in-out;
  }
`;

const ImgBox = styled.div`
  position: relative;
`;

const InfoBox = styled.div`
  flex: 1;
`;

const InfoWithImage = ({ src, title, subTitle, status }) => {
  return (
    <List>
      <ImgBox>
        <img src={chat} alt="" width="18px" height="" />
        <div className="circle"></div>
      </ImgBox>
      <InfoBox>
        <h4>NYC Food Events</h4>
        <small>544 members</small>
      </InfoBox>
    </List>
  );
};
export default InfoWithImage;
