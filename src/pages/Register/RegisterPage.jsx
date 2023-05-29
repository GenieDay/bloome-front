import React, { useState, useEffect } from "react";

// css
import * as Page from "../../styles/Page";
import "../../styles/Common.css";

// component
import UserDataForm from "../../components/Register/UserDataForm";
import KeywordForm from "../../components/Register/KeywordForm";

// api
import { selfSurvey, desireSurvey } from "../../services/apis/survey";

import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [registerPageCnt, setRegisterPageCnt] = useState(0);

  const [nickname, setNickname] = useState("");

  const [id, setId] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function moveNextPage() {
    setRegisterPageCnt(registerPageCnt + 1);
  }

  function registerSelfSurvey(words) {
    words = words.sort(function (a, b) {
      return a - b;
    });

    selfSurvey(id, words)
      .then((response) => {
        if (response.status === 200) {
          setRegisterPageCnt(registerPageCnt + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function registerDesireSurvey(words) {
    words = words.sort(function (a, b) {
      return a - b;
    });

    desireSurvey(id, words)
      .then((response) => {
        if (response.status === 200) {
          console.log("성공!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   console.log(nickname);
  //   console.log(id);
  //   console.log(password);
  //   console.log(email);
  //   console.log(registerPageCnt);
  // }, [registerPageCnt]);

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-title"}>내 정원 만들기</div>
          {registerPageCnt === 0 ? (
            <UserDataForm
              moveNextPage={moveNextPage}
              setNickname={setNickname}
              setId={setId}
              setPassword={setPassword}
              setEmail={setEmail}
            />
          ) : registerPageCnt === 1 ? (
            <KeywordForm
              registerServey={registerSelfSurvey}
              nickname={nickname}
              guideText={"님에 가장 가깝게 느껴지는"}
              submitButtonText={"다음"}
            />
          ) : (
            <KeywordForm
              registerServey={registerDesireSurvey}
              nickname={nickname}
              guideText={"님이 가지고 싶은 이미지에 대한"}
              submitButtonText={"정원 개설하기"}
            />
          )}
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
