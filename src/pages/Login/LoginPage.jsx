import React, { useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { Modal } from "react-bootstrap";

import { login } from "../../services/apis/user";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // 로그인
  const userLogin = () => {
    console.log(id, password);
    login(id, password)
      .then((response) => {
        if (response.status === 200) {
          console.log("login");
          return;
        }
      })
      .catch((error) => {
        setModalShow(true);
        return;
      });
  };

  return (
    <React.Fragment>
      {/* 로그인 실패 모달 */}
      <Modal
        size="sm"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>로그인 실패</Modal.Header>
        <Modal.Body>
          <p>잘못된 ID 혹은 PW 입니다.</p>
        </Modal.Body>
      </Modal>

      {/* 로그인 페이지 */}
      <Page.Background>
        <Page.PageBound>
          <div className="content-title">로그인</div>
          <Page.RoundedBox style={{ height: "250px" }}>
            <Form.InputBound>
              <Form.InputTitle>아이디</Form.InputTitle>
              <Form.InputBox
                type="text"
                onChange={(e) => setId(e.target.value)}
              ></Form.InputBox>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle>비밀번호</Form.InputTitle>
              <Form.InputBox
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.InputBox>
            </Form.InputBound>

            <Form.SubmitButton onClick={() => userLogin()}>
              내 정원 입장하기
            </Form.SubmitButton>
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
