import React from "react";
import styled from "styled-components";

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
  img{
    object-fit: cover;
    border-radius: 100px;
  }
`;

const InfoBox = styled.div`
  flex: 1;
`;

const InfoWithImage = ({groupId, setGroup, data}) => {
  return (
    <List id={groupId} onClick={() => setGroup(groupId)} >
      <ImgBox>
        <img src={data?.groupImage} alt="" width="35px" height="35px" />
        <div className="circle"></div>
      </ImgBox>
      <InfoBox>
        <h4>{data?.profile}</h4>
        <small>544 members</small>
      </InfoBox>
    </List>
  );
};
export default InfoWithImage;
