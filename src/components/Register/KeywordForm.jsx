import React, { useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import keywordData from "../../data/keyword.json";

export default function KeywordForm(props) {
  // props로 page cnt에 맞는 keyword register api 받아서 실행
  // props로 설명 글 받아오기
  const [userKeywords, setUserKeywords] = useState([]);

  const registerKeywords = () => {
    // 선택 키워드가 총 6개인지 확인
    // keyword 등록 api call
    // 200 시, 다음 페이지로 이동
    console.log(keywordData);
    props.moveNextPage();
  };

  function KeywordButton({ keyword }) {
    return <Form.DisabledKeywordButton>{keyword}</Form.DisabledKeywordButton>;
  }

  return (
    <Page.RoundedBox style={{ height: "400px" }}>
      <div style={{width: "80%", margin: "10px 0 20px 0"}}>
        다음 중 {props.nickname}
        {props.guideText} 키워드 6가지를 선택해주세요.
      </div>
      <Form.KeywordBound>
        {keywordData.map((item, idx) => (
          <KeywordButton keyword={item.keyword} />
        ))}
      </Form.KeywordBound>

      <Form.SubmitButton onClick={registerKeywords}>다음</Form.SubmitButton>
    </Page.RoundedBox>
  );
}
