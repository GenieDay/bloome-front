import Interceptor from "../NonTokenInterceptor";

export function login(id, password) {
  return Interceptor({
    url: "/api/v1/user/login",
    method: "post",
    data: {
      idName: id,
      password: password,
    },
  });
}

export function checkDuplicateId(id) {
  return Interceptor({
    url: "/api/v1/user/join/id-check",
    method: "post",
    data: {
      idName: id,
    },
  });
}

export function join(name, idName, password, email) {
  return Interceptor({
    url: "/api/v1/user/join",
    method: "post",
    data: {
      name: name,
      idName: idName,
      email: email,
      password: password,
    },
  });
}

export function findPw(idName) {
  return Interceptor({
    url:"api/v1/user/find-pw",
    method: "post",
    data: {
      idName: idName,
    },
  })
}
 
export function changePw(idName, oldPassword, newPassword) {
return Interceptor({
  url: "api/v1/user/change-pw",
  method: "post",
  data: {
    idName: idName,
    oldPassword: oldPassword,
    newPassword: newPassword,
  },
});
}