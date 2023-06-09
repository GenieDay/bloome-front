import styled from "styled-components";


export const InputBound = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
`;


export const InputTitle = styled.div`
  min-width: 25%;
  white-space: nowrap;
  display : flex;
	align-items : center;
  text-align: left;
  padding-top: 5px;
`;

export const TestFormBound = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TestFormTitle = styled.div`
  float: left;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 0 3px;
`

export const TestFormSubTitle = styled.div`
  float: left;
  margin: 0 0 10px 3px;
  width: 80%;
  text-align: center;
`;

export const InputBoxBound = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  color: gray;
  font-size: 0.8rem;
  position: relative;
`;

export const InputBox = styled.input`
  border-radius: 20px;
  border: 1px solid #79bae8;
  color: #333333;
  height: 30px;
  padding-left: 10px;
  width: 100%;
`;

export const EmailInputBox = styled.input`
  border-radius: 20px;
  border: 1px solid #79bae8;
  color: #333333;
  width: 100%;
  height: 30px;
  padding-left: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 30px;
  height: 40px;
  width: 60%;

  border-radius: 20px;
  border: 0px;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;
  
  cursor: pointer;

  background-color: #79bae8;
  &:hover {
    background: #b8daf2;
  }
  &:active {
    background: #b8daf2;
  }
`;

export const DisabledSubmitButton = styled.button`
  margin-top: 30px;
  height: 40px;
  width: 60%;

  border-radius: 20px;
  border: 0px;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  background-color: #aaaaaa;
`;

export const WhiteMenuButton = styled.button`
  border: none;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  margin-top: 7px;
  margin-bottom: 7px;

  height: 2.25rem;
  font-size: 1rem;

  background: white;
  &:hover {
    background: #d8eef8;
  }
  &:active {
    background: #d8eef8;
  }
`;

export const MailTipUl = styled.ul`
  padding: 0;
  margin: 0;
  width: 12em;
  height: 0px;
  padding-left: 1em;
  background-color: #ffffff;
  border: none;
  color: #3faffa;
  font-size: 0.8rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  display:inline-block;
`;

export const MailTipLi = styled.li`
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "white")};
  color: ${({ selected }) => (selected ? "black" : "gray")};
  list-style: none;
  padding-left: 5px;
`;

export const SubTextBlack = styled.p`
  margin: 5px 0 0 10px;
`;

export const SubTextRed = styled.p`
  margin: 5px 0 0 10px;
  color: red;
`;

export const SubTextGreen = styled.p`
  margin: 5px 0 0 10px;
  color: green;
`;

export const AbledKeywordButton = styled.button`
  padding: 5px 15px 5px 15px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  cursor: pointer;

  background-color: #79bae8;
  &:hover {
    background: #b8daf2;
  }
  &:active {
    background: #b8daf2;
  }
`;

export const DisabledKeywordButton = styled.button`
  padding: 5px 15px 5px 15px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;

  font-size: 1rem;
  white-space: nowrap;
  color: #000000;

  cursor: pointer;

  background-color: #ffffff;
  &:hover {
    background: #b8daf2;
  }
  &:active {
    background: #b8daf2;
  }
`;

export const KeywordBound = styled.div`
  width: 85%;
  height: 55%;
  overflow: auto;
`;

export const VisitorReportKeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 120px;
  padding: 0px;
  flex-wrap: wrap;
`;

export const MatchKeywordButton = styled.div`
  padding: 5px 15px 5px 15px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  cursor: default;

  background-color: #79bae8;
`;

export const UnMatchKeywordButton = styled.div`
  padding: 5px 15px 5px 15px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;

  font-size: 1rem;
  white-space: nowrap;
  color: #000000;

  background-color: #ffffff;

`;

export const OwnerReportKeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  padding: 0px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const OwnerReportKeywordTitle = styled.div`
  text-align: left;
  font-size: 1.1rem;
  // font-weight: bold;
`;

export const OwnerOpenKeywordButton = styled.div`
  padding: 3.5px 10px 3.5px 10px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #4d9ad1;
  height: 2rem;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  cursor: default;

  background-color: #4d9ad1;
`;

export const OwnerBlindKeywordButton = styled.div`
  padding: 3.5px 10px 3.5px 10px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;
  height: 2rem;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  cursor: default;

  background-color: #79bae8;
`;

export const OwnerHiddenKeywordButton = styled.div`
  padding: 3.5px 10px 3.5px 10px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #b3daf5;
  height: 2rem;

  font-size: 1rem;
  white-space: nowrap;
  color: #ffffff;

  cursor: default;

  background-color: #b3daf5;
`;

export const OwnerUnknownKeywordButton = styled.div`
  padding: 3.5px 10px 3.5px 10px;
  margin: 3px;
  border-radius: 20px;
  border: 1px solid #79bae8;
  height: 2rem;

  font-size: 1rem;
  white-space: nowrap;
  color: #000000;

  cursor: default;

  background-color: #ffffff;
`;