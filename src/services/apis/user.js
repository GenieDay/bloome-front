import Interceptor from "../NonTokenInterceptor";

export function login(id, password) {
  return Interceptor({
    url: "/",
    method: "post",
    data: { id, password },
  });
}

export function checkDuplicateId(id) {
  return Interceptor({
    url: "/api/v1/user/join/id-check",
    method: "post",
    data: {
      "idName": id,
    },
  });
}

export function join (name, idName, password, email) {
  return Interceptor({
    url: "/api/v1/user/join",
    method: "post",
    data: {
      name: name,
      idName: idName,
      email: email,
      password: password
    },
  });
}