import Interceptor from "../NonTokenInterceptor";

export function selfSurvey(idName, words) {
  return Interceptor({
    url: "/api/v1/survey/self",
    method: "post",
    data: {
      idName: idName,
      words: words,
    },
  });
}

export function desireSurvey(idName, words) {
  return Interceptor({
    url: "/api/v1/survey/desire",
    method: "post",
    data: {
      idName: idName,
      words: words,
    },
  });
}

export function othersSurvey(idName, othersName, words, comments) {
  return Interceptor({
    url: "/api/v1/survey/others",
    method: "post",
    data: {
      idName: idName,
      othersName: othersName,
      words: words,
      comment: comments,
    },
  });
}
