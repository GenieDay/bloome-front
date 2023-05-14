import styled from "styled-components";
import background from "../assets/images/bloome-background.png";

export const Background = styled.div`
  background-image: url(${background});
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const TitleBound = styled.div`
  position: absolute;
  top: 15%;
`;

export const PageBound = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PageBottom = styled.div`
  position: absolute;
  bottom: 15%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const RoundedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  width: 400px;
  max-width: 80%;
  max-height: 60%;
  border-radius: 15px;
  margin-top: 40px;
  padding: 0px;
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 50px;
  color: black;
  cursor: pointer;
  padding-left: 3rem;
  padding-right: 3rem;
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