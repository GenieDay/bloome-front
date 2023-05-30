import React, { useEffect, useState } from "react";
import { useAsyncValue, useParams } from "react-router-dom";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

import { useNavigate } from "react-router-dom";

// api
import { getGardenData } from "../../services/apis/garden";

// images
import whiteFlower0 from "../../assets/images/flowers/flower-white-0.png";
import whiteFlower1 from "../../assets/images/flowers/flower-white-1.png";
import whiteFlower2 from "../../assets/images/flowers/flower-white-2.png";
import whiteFlower3 from "../../assets/images/flowers/flower-white-3.png";
import whiteFlower4 from "../../assets/images/flowers/flower-white-4.png";
import whiteFlower5 from "../../assets/images/flowers/flower-white-5.png";
import whiteFlower6 from "../../assets/images/flowers/flower-white-6.png";

export default function GardenPage() {
  const [userId, setUserId] = useState(useParams().userId);
  const [userNickname, setUserNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [flowerList, setFlowerList] = useState([]);

  useEffect(() => {
    getGardenData(userId)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setUserNickname(data.name);
          setIsOwner(data.owner);
          // 임시로 5개까지만 표시 제한
          setFlowerList(data.flowers.slice(0,5));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const flowerImageList = [
    whiteFlower0,
    whiteFlower1,
    whiteFlower2,
    whiteFlower3,
    whiteFlower4,
    whiteFlower5,
    whiteFlower6,
  ];

  const flowerPosition = [
    { row: "left", "rowValue": 30, "bottomValue": 50 },
    { row: "left", "rowValue": 100, "bottomValue": 80 },
    { row: "left", "rowValue": 170, "bottomValue": 40 },
    { row: "right", "rowValue": 100, "bottomValue": 80 },
    { row: "right", "rowValue": 30, "bottomValue": 50 },
  ];

  const navigate = useNavigate();

  const navigateToTest = () => {
    navigate("/garden-test/" + userId, {
      state: {
        userId: userId,
        userNickname: userNickname,
      },
    });
  };


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
        <div
          style={{
            position: "relative",
            top: "20%",
            width: "400px",
            height: "100px",
          }}
        >
          {flowerList.map((item, idx) => {
            if (idx <= 2) {
              return (
                <div
                  style={{
                    position: "absolute",
                    left: flowerPosition[idx].rowValue,
                    bottom: flowerPosition[idx].bottomValue,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:"center",
                  }}
                >
                  <div className="flower-tester-name">{item.testerName}</div>
                  <img
                    src={flowerImageList[item.leaves]}
                    style={{
                      height: "180px",
                      width: "auto"
                    }}
                  ></img>
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    position: "absolute",
                    right: flowerPosition[idx].rowValue,
                    bottom: flowerPosition[idx].bottomValue,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="flower-tester-name">{item.testerName}</div>
                  <img
                    src={flowerImageList[item.leaves]}
                    style={{
                      height: "180px",
                      width: "auto",
                    }}
                  ></img>
                </div>
              );
            }
            })}
          {/* <img
            src={flowerImageList[3]}
            style={{
              height: "180px",
              position: "absolute",
              left: "30px",
              bottom: "50px",
            }}
          ></img>
          <img
            src={flowerImageList[0]}
            style={{
              height: "180px",
              position: "absolute",
              left: "100px",
              bottom: "80px",
            }}
          ></img>
          <img
            src={flowerImageList[5]}
            style={{
              height: "180px",
              position: "absolute",
              left: "170px",
              bottom: "40px",
            }}
          ></img>
          <img
            src={flowerImageList[4]}
            style={{
              height: "180px",
              position: "absolute",
              right: "100px",
              bottom: "80px",
            }}
          ></img>
          <img
            src={flowerImageList[1]}
            style={{
              height: "180px",
              position: "absolute",
              right: "30px",
              bottom: "50px",
            }}
          ></img> */}
        </div>
        {/* 꽃 심기 버튼 */}
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
