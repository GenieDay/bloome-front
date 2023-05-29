import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

import { useNavigate } from "react-router-dom";

export default function GardenPage() {
  const [userId, setUserId] = useState(useParams().userId);
  const [userNickname, setUserNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [flowerList, setFlowerList] = useState([]);

  const navigate = useNavigate();

  const navigateToTest = () => {
    navigate("/garden-test/" + userId, {
      state: {
        userId: userId,
        userNickname: userNickname,
      },
    });
  };

  useEffect(() => {
    setUserNickname("블루미");
    setIsOwner(false);
    setFlowerList([{ flowerId: 1, testerName: "tester1", leaves: 3 }]);
  }, []);

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
          <div className={"content-subtitle"}>
            {flowerList.length}개의 꽃이 피었습니다!
          </div>
        </div>
        {isOwner === false ? (
          <Form.SubmitButton
            style={{ position: "absolute", bottom: "10%", width: "200px" }}
            onClick={(e) => navigateToTest()}
          >
            꽃 심기
          </Form.SubmitButton>
        ) : (
          <></>
        )}
      </Page.Background>
    </React.Fragment>
  );
}
