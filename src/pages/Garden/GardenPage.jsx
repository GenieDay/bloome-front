import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

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
import { FaShareAlt } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { CgMenu } from "react-icons/cg";

import { deleteUserInfo } from "../../reducer/user";

export default function GardenPage() {
  const [userId, setUserId] = useState(useParams().userId);
  const [userNickname, setUserNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [totalFlowerList, setTotalFlowerList] = useState([]);
  const [showFlowerStartIdx, setShowFlowerStartIdx] = useState(0);
  const [showFlowerList, setShowFlowerList] = useState([]);

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
  const [menuModalShow, setMenuModalShow] = useState(false);

  useEffect(() => {
    getGardenData(userId)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          setUserNickname(data.name);
          setIsOwner(data.owner);
          setTotalFlowerList(data.flowers);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 페이지에 따른 꽃 표시
  useEffect(() => {
    setShowFlowerList(
      totalFlowerList.slice(showFlowerStartIdx, showFlowerStartIdx + 5)
    );
  }, [totalFlowerList, showFlowerStartIdx]);

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

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      alert("정원 주소가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
      alert("클립보드 복사에 실패하였습니다.");
    }
    document.body.removeChild(textArea);
  }

  const handleCopyClipBoard = () => {
    // try {
    //   console.log()
    //   navigator.clipboard.writeText(window.location.href);
    //   alert("정원 주소가 클립보드에 복사되었습니다.");
    // } catch (error) {
    //   alert("클립보드 복사에 실패하였습니다.");
    // }

    if(window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("정원 주소가 클립보드에 복사되었습니다.");
    } else {
      unsecuredCopyToClipboard(window.location.href);
    }
  };

  // 이전 페이지로 이동
  const moveNextPage = () => {
    if (showFlowerStartIdx + 5 < totalFlowerList.length) {
      setShowFlowerStartIdx(showFlowerStartIdx + 5);
    }
  };

  // 다음 페이지로 이동
  const movePrevPage = () => {
    if (showFlowerStartIdx - 5 >= 0) {
      setShowFlowerStartIdx(showFlowerStartIdx - 5);
    }
  };

  // 메인 화면으로
  const goHome = () => {
    setMenuModalShow(false);
    navigate("/");
  };

  // 로그아웃
  const logOut = () => {
    setMenuModalShow(false);
    deleteUserInfo();
    window.location.reload();
  };

  // 로그인
  const logIn = () => {
    navigate("/login");
  };

  const toPasswordManagePage = () => {
    navigate("/manage-password/"+userId);
  };

  return (
    <React.Fragment>
      {/* 메뉴 Modal */}
      <Modal
        size="sm"
        centered
        show={menuModalShow}
        onHide={() => setMenuModalShow(false)}
      >
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            MENU
          </p>
          <Form.DisabledKeywordButton
            style={{ width: "80%" }}
            onClick={() => goHome()}
          >
            홈 화면으로 가기
          </Form.DisabledKeywordButton>
          {isOwner === true ? (
            <>
              <Form.DisabledKeywordButton
                style={{ width: "80%" }}
                onClick={() => toPasswordManagePage()}
              >
                비밀번호 변경하기
              </Form.DisabledKeywordButton>
              <Form.DisabledKeywordButton
                style={{ width: "80%" }}
                onClick={() => logOut()}
              >
                로그아웃
              </Form.DisabledKeywordButton>
            </>
          ) : (
            <Form.DisabledKeywordButton
              style={{ width: "80%" }}
              onClick={() => logIn()}
            >
              내 정원 입장하기
            </Form.DisabledKeywordButton>
          )}
        </Modal.Body>
      </Modal>
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
                  <Form.MatchKeywordButton>{item.word}</Form.MatchKeywordButton>
                );
              } else {
                return (
                  <Form.UnMatchKeywordButton>
                    {item.word}
                  </Form.UnMatchKeywordButton>
                );
              }
            })}
          </Form.VisitorReportKeywordBox>
          <p
            style={{
              margin: "10px 0 0 0",
              width: "90%",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            파란색은 '서로 일치하는' 키워드를,
          </p>
          <p
            style={{
              margin: "0 0 10px 0",
              width: "90%",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            흰색은 '{reportTesterName}님만 선택한' 키워드를 나타냅니다.
          </p>

          <Form.SubmitButton
            style={{ height: "30px", marginTop: "10px" }}
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
            {totalFlowerList.length}개의 꽃이 피었습니다!
          </div>
          {isOwner === true ? (
            <Form.SubmitButton onClick={() => handleCopyClipBoard()}>
              <FaShareAlt style={{ color: "#fff" }} /> 내 정원 공유하기
            </Form.SubmitButton>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            position: "relative",
            top: "27%",
            width: "400px",
            height: "0px",
          }}
        >
          {showFlowerList.map((item, idx) => {
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
        <div
          style={{
            position: "relative",
            width: "600px",
            maxWidth: "90%",
            height: "10px",
            bottom: "18%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IoIosArrowDropleftCircle
            size="50"
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => movePrevPage()}
          ></IoIosArrowDropleftCircle>
          <IoIosArrowDroprightCircle
            size="50"
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => moveNextPage()}
          ></IoIosArrowDroprightCircle>
        </div>
        <div
          style={{
            position: "absolute",
            width: "600px",
            maxWidth: "90%",
            height: "100px",
            top: "3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <CgMenu
            size="40"
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => setMenuModalShow(true)}
          ></CgMenu>
        </div>
      </Page.Background>
    </React.Fragment>
  );
}
