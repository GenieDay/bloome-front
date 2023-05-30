import React, { useState } from "react";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

// data
import keywordData from "../../data/keyword.json";

// component
import { Form as ReactForm } from "react-bootstrap";

export default function TesterKeywordForm(props) {
  const [userKeywordList, setUserKeywordList] = useState([]);
  const [userComment, setUserComment] = useState("");

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

  const registerFormData = () => {
    props.registerTesterForm(userKeywordList, userComment);
  };

  // comment 글자 수 제한 확인
  const checkUserComment = (e) => {
    const { value, maxLength } = e.target;
    let inputComment = value.slice(0, maxLength-1);
    setUserComment(inputComment);
  }

  return (
    <Page.RoundedBox style={{ height: "800px" }}>
      {/* <Form.TestFormBound> */}
      <Form.TestFormTitle>키워드 선택하기</Form.TestFormTitle>
      <Form.TestFormSubTitle>
        다음 중 {props.userNickname}님{props.guideText} 키워드 6가지를
        선택해주세요.
      </Form.TestFormSubTitle>
      <Form.KeywordBound style={{ height: "40%" }}>
        {keywordData.map((item, idx) => (
          <KeywordButton item={item} id={idx + item} />
        ))}
      </Form.KeywordBound>

      <Form.TestFormTitle style={{ marginTop: "20px" }}>
        한 마디 남기기
      </Form.TestFormTitle>
      <Form.TestFormSubTitle>
        {props.userNickname}님은 어떤 사람인지, 혹은 {props.userNickname}님에게
        남기고 싶은 한 마디를 작성해주세요.
      </Form.TestFormSubTitle>
      <ReactForm.Control
        as="textarea"
        placeholder="해당 항목은 필수가 아닙니다."
        style={{ height: "60px", width: "80%" }}
        onChange={(e) => checkUserComment(e)}
        value={userComment}
        maxLength={255}
      />
      {userKeywordList.length < 6 ? (
        <Form.DisabledSubmitButton disabled>
          {props.submitButtonText}
        </Form.DisabledSubmitButton>
      ) : (
        <Form.SubmitButton onClick={registerFormData}>
          {props.submitButtonText}
        </Form.SubmitButton>
      )}
    </Page.RoundedBox>
  );
}
