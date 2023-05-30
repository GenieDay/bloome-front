import AxiosInterceptor from "../AxiosInterceptor";

export function getGardenData(idName) {
  return AxiosInterceptor({
    url: "/api/v1/garden/"+idName,
    method: "get",
    data: {
      idName: idName,
    },
  });
}