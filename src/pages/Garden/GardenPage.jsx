import React from "react";
import { useParams } from "react-router-dom";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

export default function GardenPage() {
  const userNickname = useParams().userId;

  return (
    <React.Fragment>
      <Page.Background>
        {/* 타이틀 */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={"content-title"}>{userNickname}님의 정원</div>
          <div className={"content-subtitle"}>n개의 꽃이 피었습니다!</div>
        </div>
        {/* 꽃 심기 버튼 - 방문자만 */}
        <Form.SubmitButton
          style={{ position: "absolute", bottom: "10%", width: "200px" }}
        >
          꽃 심기
        </Form.SubmitButton>
      </Page.Background>
    </React.Fragment>
  );
}
