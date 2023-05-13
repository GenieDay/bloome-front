import styled from "styled-components";
import background from "../assets/images/bloome-background.png";

export const Background = styled.div`
  background-image: url(${background});
  position: absolute;
  margin: 0px;
  width: 100vw;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;


export const PageBound = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 120px;
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