import React, { useEffect, useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { useNavigate } from "react-router-dom";

import { changePw } from "../../services/apis/user";

import { getUserInfo } from "../../reducer/user";



export default function ManagePasswordPage() {
  const [originPw, setOriginPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [isNewPwValid, setIsNewPwValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (newPw !== "" & newPwCheck !== "" & newPw === newPwCheck) {
      setIsNewPwValid(true);
    } else {
      setIsNewPwValid(false);
    }
  }, [newPwCheck])

  const changePassword = () => {
    
    let userId = getUserInfo().idName;

    changePw(userId, originPw, newPw)
      .then((response) => {
        if (response.status === 200) {
          alert("비밀번호가 변경되었습니다.");
          navigate("/garden/"+userId);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("오류 발생. 다시 시도해주세요.");
      });
  }

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-title"}>비밀번호 변경</div>
          <Page.RoundedBox style={{ height: "250px" }}>
            <Form.InputBound>
              <Form.InputTitle style={{ minWidth: "40%" }}>
                기존 비밀번호
              </Form.InputTitle>
              <Form.InputBox
                type="password"
                onChange={(e) => setOriginPw(e.target.value)}
              ></Form.InputBox>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle style={{ minWidth: "40%" }}>
                새 비밀번호
              </Form.InputTitle>
              <Form.InputBox
                type="password"
                onChange={(e) => setNewPw(e.target.value)}
              ></Form.InputBox>
            </Form.InputBound>
            <Form.InputBound>
              <Form.InputTitle
                style={{ minWidth: "40%", paddingBottom: "20px" }}
              >
                새 비밀번호 확인
              </Form.InputTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form.InputBox
                  type="password"
                  onChange={(e) => setNewPwCheck(e.target.value)}
                ></Form.InputBox>
                {newPwCheck === "" ? (
                  <div style={{ height: "20px" }} />
                ) : isNewPwValid === true ? (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      marginLeft: "10px",
                      height: "20px",
                      color: "green",
                    }}
                  >
                    비밀번호가 일치합니다.
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      marginLeft: "10px",
                      height: "20px",
                      color: "red",
                    }}
                  >
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
            </Form.InputBound>
            {isNewPwValid === false ? (
              <Form.DisabledSubmitButton disabled style={{ marginTop: "10px" }}>
                확인
              </Form.DisabledSubmitButton>
            ) : (
              <Form.SubmitButton
                style={{ marginTop: "10px" }}
                onClick={() => changePassword()}
              >
                확인
              </Form.SubmitButton>
            )}
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
