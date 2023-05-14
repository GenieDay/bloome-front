import React from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  }

  return (
    <React.Fragment>
      <Page.Background>
        <Page.TitleBound>
          <div className="app-subtitle">나를 꽃 피우는 나만의 정원</div>
          <div className="app-title">BLOOME</div>
        </Page.TitleBound>
        <Page.PageBottom>
          <Form.WhiteMenuButton
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
            onClick={navigateToLogin}
          >
            내 정원 입장하기
          </Form.WhiteMenuButton>
          <Form.WhiteMenuButton
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
            onClick={navigateToRegister}
          >
            내 정원 개설하기
          </Form.WhiteMenuButton>
        </Page.PageBottom>
      </Page.Background>
    </React.Fragment>
  );
}
