import React, { useEffect, useRef, useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");

  const [id, setId] = useState("");
  const [idValid, setIdValid] = useState(0); // 0: 초기, 1: 사용가능, -1: 사용불가, -2: 미입력

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(0); // 0: 초기, 1: 사용가능, -1: 사용불가

  const FrequencyEmails = [
    "@naver.com",
    "@gmail.com",
    "@daum.net",
    "@hanmail.net",
    "@yahoo.com",
    "@outlook.com",
    "@nate.com",
    "@kakao.com",
  ];

  const [emailList, setEmailList] = useState(FrequencyEmails);
  const [selectedEmail, setSelectedEmail] = useState(-1);
  const [isEmailDropBox, setIsEmailDropBox] = useState(false);

  // 아이디 유효성 및 중복 검사
  const checkIdValid = (e) => {
    if (e.target.value.replace(/^\s+|\s+$/gm, "") !== "") {
      // e.target.value로 id 중복 검사
      // response에 따라 idValid 값 변경
      setIdValid(1);
    } else {
      setIdValid(-2);
    }
  };

  // 이메일 유효성 검사
  const checkEmailValid = (value) => {

    var regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (value.replace(/^\s+|\s+$/gm, "") !== "") {
      if (regEmail.test(value)) {
        setEmailValid(1);
      }
      else {
        setEmailValid(-1);
      }
    } else {
      setEmailValid(0);
    }
  }

  useEffect(() => {
    checkEmailValid(email);
  }, [email]);

  // 이메일 변경
  const onChangeEmail = (value) => {
    setEmail(value);

    if (value.includes("@")) {
      setIsEmailDropBox(true);
      setEmailList(
        FrequencyEmails.filter((el) => el.includes(value.split("@")[1]))
      );
    } else {
      setIsEmailDropBox(false);
      setSelectedEmail(-1);
    }
  };

  // 드롭다운 옵션 선택
  const handleKeyUp = (e) => {
    if (isEmailDropBox) {
      if (e.key === "ArrowDown" && emailList.length - 1 > selectedEmail) {
        setSelectedEmail(selectedEmail + 1);
      }
      if (e.key === "ArrowUp" && selectedEmail >= 0) {
        setSelectedEmail(selectedEmail - 1);
      }
      if (e.key === "Enter" && selectedEmail >= 0) {
        handleDropDownClick(email, emailList[selectedEmail]);
      }
    }
  };

  // 드롭다운을 통한 이메일 변경
  const handleDropDownClick = (first, second) => {
    setEmail(`${first.split("@")[0]}${second}`);
    setIsEmailDropBox(false);
    setSelectedEmail(-1);
  };

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-title"}>내 정원 만들기</div>
          <Page.RoundedBox style={{ height: "400px" }}>
            <Form.InputBound>
              <Form.InputTitle>
                닉네임<span style={{ color: "red" }}>*</span>
              </Form.InputTitle>
              <Form.InputBoxBound>
                <Form.InputBox
                  type="text"
                  onChange={(e) => setNickname(e.target.value)}
                ></Form.InputBox>
                <p style={{ margin: "5px 0 0 10px" }}>
                  닉네임은 회원님의 정원을 방문한 모든 분들에게 공개되므로
                  신중히 등록해주세요.
                </p>
              </Form.InputBoxBound>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle>
                아이디<span style={{ color: "red" }}>*</span>
              </Form.InputTitle>
              <Form.InputBoxBound>
                <Form.InputBox
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                  onBlur={(e) => checkIdValid(e)}
                ></Form.InputBox>
                {idValid === 1 ? (
                  <p style={{ margin: "5px 0 0 10px", color: "green" }}>
                    사용가능한 아이디입니다.
                  </p>
                ) : idValid === -1 ? (
                  <p style={{ margin: "5px 0 0 10px", color: "red" }}>
                    이미 사용 중인 아이디입니다.
                  </p>
                ) : idValid === -2 ? (
                  <p style={{ margin: "5px 0 0 10px", color: "red" }}>
                    아이디를 입력해주세요.
                  </p>
                ) : (
                  <p style={{ margin: "5px 0 0 10px" }}></p>
                )}
              </Form.InputBoxBound>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle>
                비밀번호<span style={{ color: "red" }}>*</span>
              </Form.InputTitle>
              <Form.InputBoxBound>
                <Form.InputBox
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.InputBox>
              </Form.InputBoxBound>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle>이메일</Form.InputTitle>
              <Form.InputBoxBound>
                <Form.InputBox
                  id={email}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    onChangeEmail(e.target.value);
                  }}
                  onBlur={(e) => checkEmailValid(e.target.value)}
                  onKeyUp={handleKeyUp}
                />
                {emailValid === 1 ? (
                  <p
                    style={{
                      margin: "5px 0 0 10px",
                      display: "inline-block",
                      height: "0px",
                      color: "green",
                    }}
                  >
                    유효한 이메일 형식입니다.
                  </p>
                ) : emailValid === -1 ? (
                  <p
                    style={{
                      margin: "5px 0 0 10px",
                      display: "inline-block",
                      height: "0px",
                      color: "red",
                    }}
                  >
                    올바른 이메일 주소를 입력하세요.
                  </p>
                ) : (
                  <p
                    style={{
                      margin: "5px 0 0 10px",
                      display: "inline-block",
                      height: "0px",
                    }}
                  >
                    비밀번호 분실 시, 비밀번호 찾기 이메일을 받을 주소를
                    입력해주세요.
                  </p>
                )}
                {isEmailDropBox && (
                  <Form.MailTipUl>
                    {emailList.map((item, idx) => (
                      <Form.MailTipLi
                        key={idx}
                        onMouseOver={() => setSelectedEmail(idx)}
                        onClick={() => handleDropDownClick(email, item)}
                        selected={selectedEmail === idx}
                      >
                        {email.split("@")[0]}
                        {item}
                      </Form.MailTipLi>
                    ))}
                  </Form.MailTipUl>
                )}
              </Form.InputBoxBound>
            </Form.InputBound>

            <Form.SubmitButton>다음</Form.SubmitButton>
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
