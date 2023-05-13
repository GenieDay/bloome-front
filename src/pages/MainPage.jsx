import React from "react";
import * as Page from "../styles/Page";
import "../styles/Common.css"
export default function MainPage() {
  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className="app-subtitle">나를 꽃 피우는 나만의 정원</div>
          <div className="app-title">BLOOME</div>
          <Page.PageBottom>
            <Page.MenuButton>내 정원 입장하기</Page.MenuButton>
            <Page.MenuButton>내 정원 개설하기</Page.MenuButton>
          </Page.PageBottom>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
