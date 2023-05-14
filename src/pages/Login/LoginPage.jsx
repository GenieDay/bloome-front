import React from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

export default function LoginPage() {
  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className="content-title">로그인</div>
          <Page.RoundedBox style={{ height: "250px" }}>
            <Form.InputBound>
              <Form.InputTitle>아이디</Form.InputTitle>
              <Form.InputBox type="text"></Form.InputBox>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle>비밀번호</Form.InputTitle>
              <Form.InputBox type="password"></Form.InputBox>
            </Form.InputBound>

            <Form.SubmitButton>내 정원 입장하기</Form.SubmitButton>
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
