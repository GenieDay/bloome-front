import React, { useState, useEffect } from "react";

// css
import * as Page from "../../styles/Page";
import "../../styles/Common.css";

// component
import UserDataForm from "../../components/Register/UserDataForm";
import KeywordForm from "../../components/Register/KeywordForm";

export default function RegisterPage() {
  const [registerPageCnt, setRegisterPageCnt] = useState(0);

  const [nickname, setNickname] = useState("");

  const [id, setId] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  // 다음 가입 단계로 이동
  function moveNextPage() {
    setRegisterPageCnt(registerPageCnt + 1);
  }

  // 최종 단계 완료 후, 내 정원으로 이동
  function moveHomePage() {
    console.log('내 정원으로 이동');
  }

  useEffect(() => {
    console.log(nickname);
    console.log(id);
    console.log(password);
    console.log(email);
    console.log(registerPageCnt);
  }, [registerPageCnt]);

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
              moveNextPage={moveNextPage}
              nickname={nickname}
              guideText={"님에 가장 가깝게 느껴지는"}
              submitButtonText={"다음"}
            />
          ) : (
            <KeywordForm
              moveNextPage={moveHomePage}
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
