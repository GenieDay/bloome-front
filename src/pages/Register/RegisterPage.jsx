import React, { useState, useEffect } from "react";

// css
import * as Page from "../../styles/Page";
import "../../styles/Common.css";

// component
import UserDataForm from "../../components/Register/UserDataForm";

export default function RegisterPage() {

  const [registerPageCnt, setRegisterPageCnt] = useState(0);

  const [nickname, setNickname] = useState("");

  const [id, setId] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  // 다음 가입 단계로 이동
  function moveNextPage () {
    setRegisterPageCnt(registerPageCnt + 1);
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
          <UserDataForm
            moveNextPage={moveNextPage}
            setNickname={setNickname}
            setId={setId}
            setPassword={setPassword}
            setEmail={setEmail}
          />
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
