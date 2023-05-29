import React, { useEffect, useState } from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import keywordData from "../../data/keyword.json";

export default function KeywordForm(props) {

  // props로 page cnt에 맞는 keyword register api 받아서 실행
  // props로 설명 글 받아오기

  const [userKeywordList, setUserKeywordList] = useState([]);

  useEffect(() => {
    console.log(userKeywordList);
  }, [userKeywordList]);

  // 키워드 버튼 선택 시 처리
  function clickKeyword(item) {
    console.log(item);
    // 이미 포함되지 않았거나, 길이가 6 미만인 경우 userKeywordList에 추가
    if (!userKeywordList.includes(item.id) && userKeywordList.length < 6) {
      let newList = [...userKeywordList];
      newList.push(item.id);
      setUserKeywordList(newList);
    }
    // 이미 포함되었다면 userKeywordList에서 삭제
    else if (userKeywordList.includes(item.id)) {
      let newList = [...userKeywordList];
      newList = newList.filter((element) => element !== item.id);
      setUserKeywordList(newList);
    }
  }

  // 다음 버튼 선택 시 처리
  const registerKeywords = () => {

    // userKeywordList를 등록하는 api call
    props.registerServey(userKeywordList);
    // 200인 경우
    // userKeywordList 초기화
    setUserKeywordList([]);
  };

  function KeywordButton({ item }) {
    return userKeywordList.includes(item.id) ? (
      <Form.AbledKeywordButton onClick={() => clickKeyword(item)}>
        {item.keyword}
      </Form.AbledKeywordButton>
    ) : (
      <Form.DisabledKeywordButton onClick={() => clickKeyword(item)}>
        {item.keyword}
      </Form.DisabledKeywordButton>
    );
  }

  return (
    <Page.RoundedBox style={{ height: "400px" }}>
      <div style={{ width: "80%", margin: "10px 0 20px 0" }}>
        다음 중 {props.nickname}
        {props.guideText} 키워드 6가지를 선택해주세요.
      </div>
      <Form.KeywordBound>
        {keywordData.map((item, idx) => (
          <KeywordButton item={item} />
        ))}
      </Form.KeywordBound>
      {userKeywordList.length < 6 ? (
        <Form.DisabledSubmitButton disabled>
          {props.submitButtonText}
        </Form.DisabledSubmitButton>
      ) : (
        <Form.SubmitButton onClick={registerKeywords}>
          {props.submitButtonText}
        </Form.SubmitButton>
      )}
    </Page.RoundedBox>
  );
}
