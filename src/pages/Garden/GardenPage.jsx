import React, { useEffect, useState } from "react";
import { useAsyncValue, useParams } from "react-router-dom";

// css
import * as Page from "../../styles/Page";
import * as Form from "../../styles/Form";
import "../../styles/Common.css";

import { useNavigate } from "react-router-dom";

// api
import { getGardenData } from "../../services/apis/garden";
import { visitorReport, ownerReport } from "../../services/apis/report";

// images
import whiteFlower0 from "../../assets/images/flowers/flower-white-0.png";
import whiteFlower1 from "../../assets/images/flowers/flower-white-1.png";
import whiteFlower2 from "../../assets/images/flowers/flower-white-2.png";
import whiteFlower3 from "../../assets/images/flowers/flower-white-3.png";
import whiteFlower4 from "../../assets/images/flowers/flower-white-4.png";
import whiteFlower5 from "../../assets/images/flowers/flower-white-5.png";
import whiteFlower6 from "../../assets/images/flowers/flower-white-6.png";

//component
import { Modal } from "react-bootstrap";
import { Form as ReactForm } from "react-bootstrap";

export default function GardenPage() {
  const [userId, setUserId] = useState(useParams().userId);
  const [userNickname, setUserNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [flowerList, setFlowerList] = useState([]);

  const [visitorReportShow, setVisitorReportShow] = useState(false);
  const [ownerReportShow, setOwnerReportShow] = useState(false);
  const [reportTesterName, setReportTesterName] = useState("");
  const [visitorReportKeywordList, setVisitorReportKeywordList] = useState([]);
  const [ownerReportKeywordList, setOwnerReportKeywordList] = useState({
    open: [],
    blind: [],
    hidden: [],
    unknown: [],
  });
  const [ownerReportComment, setOwnerReportComment] = useState("");

  useEffect(() => {
    getGardenData(userId)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setUserNickname(data.name);
          setIsOwner(data.owner);
          // 임시로 5개까지만 표시 제한
          setFlowerList(data.flowers.slice(0, 5));
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
    { row: "left", rowValue: 30, bottomValue: 50 },
    { row: "left", rowValue: 100, bottomValue: 80 },
    { row: "left", rowValue: 170, bottomValue: 40 },
    { row: "right", rowValue: 100, bottomValue: 80 },
    { row: "right", rowValue: 30, bottomValue: 50 },
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

  const showFlowerDetails = (flowerId, testerName) => {
    console.log(isOwner);
    console.log(flowerId);
    console.log("clicked");
    if (isOwner === false) {
      visitorReport(flowerId)
        .then((response) => {
          if (response.status === 200) {
            setVisitorReportKeywordList(response.data.data.adjectiveSets);
            setReportTesterName(testerName);
            setVisitorReportShow(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ownerReport(flowerId)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.data.window);
            setOwnerReportKeywordList(response.data.data.window);
            setOwnerReportComment(response.data.data.comment);
            setReportTesterName(testerName);
            setOwnerReportShow(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <React.Fragment>
      {/* 방문자 리포트 */}
      <Modal
        size="sm"
        centered
        show={visitorReportShow}
        onHide={() => setVisitorReportShow(false)}
      >
        <Modal.Header
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          {reportTesterName}님이 생각하는
          <br />
          {userNickname}님은 이런 사람이에요!
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form.VisitorReportKeywordBox>
            {visitorReportKeywordList.map((item) => {
              if (item.isMatch === true) {
                return (
                  <Form.MatchKeywordButton>{item}</Form.MatchKeywordButton>
                );
              } else {
                return (
                  <Form.UnMatchKeywordButton>{item}</Form.UnMatchKeywordButton>
                );
              }
            })}
          </Form.VisitorReportKeywordBox>
          <Form.SubmitButton
            style={{ height: "30px" }}
            onClick={(e) => setVisitorReportShow(false)}
          >
            확인
          </Form.SubmitButton>
        </Modal.Body>
      </Modal>

      {/* 사용자 리포트 */}
      <Modal
        size="sm"
        centered
        show={ownerReportShow}
        onHide={() => setOwnerReportShow(false)}
      >
        <Modal.Header
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          {reportTesterName}님이 생각하는
          <br />
          {userNickname}님은 이런 사람이에요!
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ownerReportKeywordList.open.length !== 0 ? (
            <Form.OwnerReportKeywordTitle>
              우리 모두 아는 나
            </Form.OwnerReportKeywordTitle>
          ) : (
            <></>
          )}
          <Form.OwnerReportKeywordBox>
            {ownerReportKeywordList.open.map((item) => {
              return (
                <Form.OwnerOpenKeywordButton>
                  {item}
                </Form.OwnerOpenKeywordButton>
              );
            })}
          </Form.OwnerReportKeywordBox>

          {ownerReportKeywordList.blind.length !== 0 ? (
            <Form.OwnerReportKeywordTitle>
              {reportTesterName}님만 아는 나
            </Form.OwnerReportKeywordTitle>
          ) : (
            <></>
          )}
          <Form.OwnerReportKeywordBox>
            {ownerReportKeywordList.blind.map((item) => {
              return (
                <Form.OwnerBlindKeywordButton>
                  {item}
                </Form.OwnerBlindKeywordButton>
              );
            })}
          </Form.OwnerReportKeywordBox>

          {ownerReportKeywordList.hidden.length !== 0 ? (
            <Form.OwnerReportKeywordTitle>
              {userNickname}만 아는 나
            </Form.OwnerReportKeywordTitle>
          ) : (
            <></>
          )}
          <Form.OwnerReportKeywordBox>
            {ownerReportKeywordList.hidden.map((item) => {
              return (
                <Form.OwnerHiddenKeywordButton>
                  {item}
                </Form.OwnerHiddenKeywordButton>
              );
            })}
          </Form.OwnerReportKeywordBox>

          {ownerReportKeywordList.unknown.length !== 0 ? (
            <Form.OwnerReportKeywordTitle>
              내가 되고 싶은 나
            </Form.OwnerReportKeywordTitle>
          ) : (
            <></>
          )}
          <Form.OwnerReportKeywordBox>
            {ownerReportKeywordList.unknown.map((item) => {
              return (
                <Form.OwnerUnknownKeywordButton>
                  {item}
                </Form.OwnerUnknownKeywordButton>
              );
            })}
          </Form.OwnerReportKeywordBox>
          {ownerReportComment.length !== 0 ? (
            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Form.OwnerReportKeywordTitle>
                {reportTesterName}님이 전하는 한 마디
              </Form.OwnerReportKeywordTitle>
              <ReactForm.Control
                type="text"
                value={ownerReportComment}
                readOnly
                style={{ width: "90%", height: "50px" }}
              />
            </div>
          ) : (
            <></>
          )}

          <Form.SubmitButton
            style={{ height: "30px", marginTop: "20px" }}
            onClick={(e) => setOwnerReportShow(false)}
          >
            확인
          </Form.SubmitButton>
        </Modal.Body>
      </Modal>

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
                    justifyContent: "center",
                  }}
                >
                  <div className="flower-tester-name">{item.testerName}</div>
                  <img
                    src={flowerImageList[item.leaves]}
                    style={{
                      height: "180px",
                      width: "auto",
                      cursor: "pointer",
                    }}
                    onClick={(e) =>
                      showFlowerDetails(item.flowerId, item.testerName)
                    }
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
                      cursor: "pointer",
                    }}
                    onClick={(e) =>
                      showFlowerDetails(item.flowerId, item.testerName)
                    }
                  ></img>
                </div>
              );
            }
          })}
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
