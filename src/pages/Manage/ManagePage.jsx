import React from "react";
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";
import { useNavigate } from "react-router-dom";

export default function ManagePage() {

  return (
    <React.Fragment>
      <Page.Background>
        <Page.PageBound>
          <div className={"content-title"}>내 정원 관리하기</div>
          <Page.RoundedBox style={{ height: "450px" }}>
            
          </Page.RoundedBox>
        </Page.PageBound>
      </Page.Background>
    </React.Fragment>
  );
}
