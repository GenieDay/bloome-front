import React, { useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { Modal } from "react-bootstrap";

// apis
import { login } from "../../services/apis/user";
import { findPw } from "../../services/apis/user";

import { userInfo } from "../../reducer/user";

import { useNavigate } from "react-router-dom";

import emailjs from "@emailjs/browser";

export default function LoginPage() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [idForFindPw, setIdForFindPw] = useState("");
  const [findPwModalShow, setFindPwModalShow] = useState(false);

  // 로그인
  const userLogin = () => {
    console.log(id, password);
    login(id, password)
      .then((response) => {
        if (response.status === 200) {
          userInfo(response.data.data);
          navigate("/garden/" + id);
          return;
        }
      })
      .catch((error) => {
        setModalShow(true);
        return;
      });
  };

  const sendEmail = () => {
    let mailData = {
      user_name: idForFindPw,
      user_email: "",
      message: "",
    };

    console.log(idForFindPw);

    // 아이디 입력하지 않은 경우, alert
    if (idForFindPw.replace(/^\s+|\s+$/gm, "") === "") {
      alert("아이디를 입력해주세요.");
      return;
    }

    // 이메일 찾기 api
    findPw(idForFindPw)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          mailData.user_email = response.data.data.email;
          mailData.message = response.data.data.password;

          // 이메일 전송
          emailjs
            .send(
              process.env.REACT_APP_EMAIL_ID,
              process.env.REACT_APP_EMAIL_TEMPLATE,
              mailData,
              process.env.REACT_APP_EMAIL_PRIVATEKEY
            )
            .then(
              (result) => {
                console.log(result.text);
                setFindPwModalShow(false);
                alert("회원님의 이메일로 임시 비밀번호가 발송되었습니다.");
                setIdForFindPw("");
              },
              (error) => {
                console.log(error.text);
              }
            );
        }
      })
      .catch((error) => {
        setFindPwModalShow(false);
        if (error.status === "404") {
          alert("사용자를 찾을 수 없습니다. 다시 시도해주세요.");
        } else {
          alert("오류 발생. 다시 시도해주세요.");
        }
        setIdForFindPw("");
        return;
      });
      console.log(mailData);

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

      {/* 비밀번호 찾기 모달 */}
      <Modal
        size="sm"
        centered
        show={findPwModalShow}
        onHide={() => setFindPwModalShow(false)}
      >
        <Modal.Header closeButton>비밀번호 찾기</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0 }}>회원님의 아이디를 입력해주세요.</p>
          <p style={{ margin: 0 }}>
            회원가입 시 입력한 이메일로 임시 비밀번호를 발송해드립니다.
          </p>
          <Form.InputBound style={{ width: "80%" }}>
            <Form.InputTitle>아이디</Form.InputTitle>
            <Form.InputBox
              type="text"
              onChange={(e) => setIdForFindPw(e.target.value)}
            ></Form.InputBox>
          </Form.InputBound>
          <Form.SubmitButton
            style={{ margin: "0" }}
            onClick={() => sendEmail()}
          >
            확인
          </Form.SubmitButton>
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

            <Form.SubmitButton style={{marginTop: "10px"}} onClick={() => userLogin()}>
              내 정원 입장하기
            </Form.SubmitButton>
            <p
              onClick={() => setFindPwModalShow(true)}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              비밀번호 찾기
            </p>
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
