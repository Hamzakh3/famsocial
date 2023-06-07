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
    <List id={groupId} onClick={() => setGroup && setGroup(groupId, data)} >
      <ImgBox>
        <img src={data?.img} alt="" width="35px" height="35px" />
        <div className="circle"></div>
      </ImgBox>
      <InfoBox>
        <h4>{data?.name}</h4>
        <small>{data?.members.length} Members</small>
      </InfoBox>
    </List>
  );
};
export default InfoWithImage;
