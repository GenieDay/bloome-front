import React, { useEffect, useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { checkDuplicateId, join } from "../../services/apis/user";

export default function UserDataForm(props) {
  // --valid code--
  // -3 : 예상치 못한 에러 상황
  // -2 : 미입력
  // -1 : 사용 불가 (유효하지 않음)
  // 0  : 초기
  // 1  : 사용 가능

  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState(0);

  const [id, setId] = useState("");
  const [idValid, setIdValid] = useState(0);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(0);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(0);

  useEffect(()=>{
    console.log(id);
  }, [id]);

  // 아이디 중복 검사
  async function checkIdValid(value) {
    let targetValue = typeof value !== "string" ? toString(value) : value;
    if (targetValue.replace(/^\s+|\s+$/gm, "") !== "") {
      let data = await checkDuplicateId(targetValue)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.status);
            return 1;
          }
        })
        .catch((error) => {
          // error status 409인 경우 확인 필요
          console.log(error.response.status);
          if (error.response.status === 409) {
            return -1;
          }
          else {
            return -3;
          }
        });
      return data;
    } else {
      return -2;
    }

  }

  // promise id value 가져오기 -> setIdValid
  const setPromiseIdValid = (value) => {
    const promise = value;
    promise.then((promise) => {
      setIdValid(promise);
    });
  };

  // 이메일 유효성 검사
  const checkEmailValid = (value) => {
    let targetValue = typeof value !== "string" ? toString(value) : value;
    var regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (targetValue.replace(/^\s+|\s+$/gm, "") !== "") {
      if (regEmail.test(targetValue)) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  // 빈 값 확인
  const checkIsNull = (value) => {
    if (value === null || value === undefined) {
      return -2;
    }

    let valueWithNoSpace =
      typeof value !== "string"
        ? toString(value).replace(/^\s+|\s+$/gm, "")
        : value.replace(/^\s+|\s+$/gm, "");

    if (valueWithNoSpace === "") {
      return -2;
    } else {
      return 1;
    }
  };

  // 등록 전 최종 점검 (빈 값 확인 및 이메일 유효성 확인)
  const checkRegister = () => {

    console.log(id);
    
    let checkNickName, checkId, checkPassword, checkEmail;

    checkNickName = checkIsNull(nickname);
    checkPassword = checkIsNull(password);
    checkEmail = checkIsNull(email) === 1 ? checkEmailValid(email) : -2;
    checkId = checkIsNull(id);

    setNicknameValid(checkNickName);
    if (checkId === -2) setIdValid(checkId);
    setPasswordValid(checkPassword);
    setEmailValid(checkEmail);

    // 빈 값 또는 유효하지 않은 값 있는 경우, 더 이상 진행하지 않음
    if (
      checkNickName < 0 ||
      checkPassword < 0 ||
      checkIdValid < 0 ||
      checkEmail < 0
    ) {
      return;
    }

    // 회원가입 api call
    join(nickname, id, password, email)
      .then((response) => {
        if (response.status === 200) {
          props.setNickname(nickname);
          props.setId(id);
          props.setPassword(password);
          props.setEmail(email);
          props.moveNextPage();
          return;
        }
      })
      .catch((error) => {
        // error status 409인 경우 확인 필요
        if(error.response.status === 409) {
          setIdValid(-1);
          return;
        }
      });
  };

  return (
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
          {nicknameValid === -2 ? (
            <Form.SubTextRed>닉네임을 입력해주세요.</Form.SubTextRed>
          ) : nicknameValid === 0 ? (
            <Form.SubTextBlack>
              닉네임은 회원님의 정원을 방문한 모든 분들에게 공개되므로 신중히
              등록해주세요.
            </Form.SubTextBlack>
          ) : (
            <Form.SubTextBlack />
          )}
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
            onBlur={(e) => setPromiseIdValid(checkIdValid(e.target.value))}
          ></Form.InputBox>
          {idValid === 1 ? (
            <Form.SubTextGreen>사용가능한 아이디입니다.</Form.SubTextGreen>
          ) : idValid === -1 ? (
            <Form.SubTextRed>이미 사용 중인 아이디입니다.</Form.SubTextRed>
          ) : idValid === -2 ? (
            <Form.SubTextRed>아이디를 입력해주세요.</Form.SubTextRed>
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
          {passwordValid === -2 ? (
            <Form.SubTextRed>비밀번호를 입력해주세요.</Form.SubTextRed>
          ) : (
            <Form.SubTextBlack />
          )}
        </Form.InputBoxBound>
      </Form.InputBound>
      <Form.InputBound>
        <Form.InputTitle>
          이메일<span style={{ color: "red" }}>*</span>
        </Form.InputTitle>
        <Form.InputBoxBound>
          <Form.InputBox
            id={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailValid === 1 ? (
            <Form.SubTextGreen>유효한 이메일 형식입니다.</Form.SubTextGreen>
          ) : emailValid === -1 ? (
            <Form.SubTextRed>올바른 이메일 주소를 입력하세요.</Form.SubTextRed>
          ) : emailValid === -2 ? (
            <Form.SubTextRed>이메일 주소를 입력해주세요.</Form.SubTextRed>
          ) : (
            <Form.SubTextBlack>
              비밀번호 분실 시, 비밀번호 찾기 이메일을 받을 주소를 입력해주세요.
            </Form.SubTextBlack>
          )}
        </Form.InputBoxBound>
      </Form.InputBound>

      <Form.SubmitButton onClick={() => checkRegister()}>
        다음
      </Form.SubmitButton>
    </Page.RoundedBox>
  );
}
