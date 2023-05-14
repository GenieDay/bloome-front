import styled from "styled-components";


export const InputBound = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const InputTitle = styled.div`
  min-width: 20%;
  margin-right: 10px;
  white-space: nowrap;
`;
export const InputBox = styled.input`
  border-radius: 20px;
  border: 1px solid #79bae8;
  color: #333333;
  width: 60%;
  height: 30px;
  padding-left: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  height: 40px;
  width: 60%;

  border-radius: 20px;
  border: 0px;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;
  
  cursor: pointer;

  background-color: #79bae8;
  &:hover {
    background: #b8daf2;
  }
  &:active {
    background: #b8daf2;
  }
`;

export const WhiteMenuButton = styled.button`
  border: none;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  margin-top: 7px;
  margin-bottom: 7px;

  height: 2.25rem;
  font-size: 1rem;

  background: white;
  &:hover {
    background: #d8eef8;
  }
  &:active {
    background: #d8eef8;
  }
`;