import React, { useState } from "react";

// css
import * as Page from "../../styles/Page";
import "../../styles/Common.css";

// component
import KeywordForm from "../../components/Register/KeywordForm";

import { useParams } from "react-router-dom";
import TesterDataForm from "../../components/Test/TesterDataForm";

export default function GardenTestPage() {
  const params = useParams().userId;

  const [testPageCnt, setTestPageCnt] = useState(0);

  const [testerNickname, setTesterNickname] = useState("");

  function moveNextPage() {
    setTestPageCnt(testPageCnt + 1);
  }

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-subtitle"}>{params}님의 정원에</div>
          <div className={"content-title"}>꽃 선물하기</div>
          {testPageCnt === 0 ? (
            <TesterDataForm
              moveNextPage={moveNextPage}
              setTesterNickname={setTesterNickname}
            />
          ) : (
            <div />
          )}
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
