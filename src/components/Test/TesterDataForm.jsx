import React, { useState } from "react";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

export default function TesterDataForm(props) {
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState(0);

  const registerTesterData = () => {
    let valueWithNoSpace =
      typeof nickname !== "string"
        ? toString(nickname).replace(/^\s+|\s+$/gm, "")
        : nickname.replace(/^\s+|\s+$/gm, "");

    if (valueWithNoSpace === "") {
      setNicknameValid(-2);
    }
    else {
      setNicknameValid(1);
      props.setTesterNickname(nickname);
      props.moveNextPage();
    }
  };

  return (
    <Page.RoundedBox style={{ height: "250px" }}>
      <Form.TestFormBound>
        <Form.TestFormTitle>닉네임</Form.TestFormTitle>
        <Form.TestFormSubTitle>
          꽃과 함께 남길 닉네임을 입력해주세요.
        </Form.TestFormSubTitle>
        <Form.InputBox
          type="text"
          onChange={(e) => setNickname(e.target.value)}
        />
        {nicknameValid === -2 ? (
          <Form.SubTextRed>닉네임을 입력해주세요.</Form.SubTextRed>
        ) : (
          <Form.SubTextRed style={{ visibility: "hidden" }}>
            아이디를 입력해주세요.
          </Form.SubTextRed>
        )}
      </Form.TestFormBound>
      <Form.SubmitButton style={{marginTop:"0px"}} onClick={() => registerTesterData()}>
        다음
      </Form.SubmitButton>
    </Page.RoundedBox>
  );
}
