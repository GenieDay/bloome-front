import React, { useState } from "react";

// css
import * as Page from "../../styles/Page";
import "../../styles/Common.css";

// component
import TesterDataForm from "../../components/Test/TesterDataForm";
import TesterKeywordForm from "../../components/Test/TesterKeywordForm";

// route
import { useLocation, useNavigate } from "react-router-dom";


// api
import { othersSurvey } from "../../services/apis/survey";

export default function GardenTestPage(props) {
  const location = useLocation();

  const [userId, setUserId] = useState(location.state.userId);
  const [userNickname, setUserNickname] = useState(location.state.userNickname);

  const [testPageCnt, setTestPageCnt] = useState(0);

  const [testerNickname, setTesterNickname] = useState("");

  const navigate = useNavigate();

  function moveNextPage() {
    setTestPageCnt(testPageCnt + 1);
  }

  // 테스트 완료 후, 내 정원으로 이동
  function moveGardenPage() {
    console.log("내 정원으로 이동");
  }

  function registerTesterForm(testerList, testerComment) {
    let testerKeywordIdList = [...testerList];

    // 정렬
    testerKeywordIdList = testerKeywordIdList.sort(function (a, b) {
      return a - b;
    });

    // tester의 nickname, keywordList, Comment 등록 api call
    othersSurvey(userId, testerNickname, testerKeywordIdList, testerComment)
      .then((response) => {
        if (response.status === 200) {
          navigate("/garden/"+userId);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(testerNickname);
    console.log(testerKeywordIdList);
    console.log(testerComment);
  }

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-subtitle"}>{userNickname}님의 정원에</div>
          <div className={"content-title"}>꽃 선물하기</div>
          {testPageCnt === 0 ? (
            <TesterDataForm
              moveNextPage={moveNextPage}
              setTesterNickname={setTesterNickname}
            />
          ) : testPageCnt === 1 ? (
            <TesterKeywordForm
              userNickname={userNickname}
              testerNickname={testerNickname}
              moveNextPage={moveGardenPage}
              guideText={"에 가깝게 느껴지는"}
              submitButtonText={"꽃 심기"}
              registerTesterForm={registerTesterForm}
            />
          ) : (
            <div />
          )}
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
