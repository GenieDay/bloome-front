import Interceptor from "../NonTokenInterceptor";

export function visitorReport(flowerId) {
  return Interceptor({
    url: "/api/v1/report/for-visitors/" + flowerId,
    method: "get",
    data: {
      flowerId: flowerId,
    },
  });
}

export function ownerReport(flowerId) {
  return Interceptor({
    url: "/api/v1/report/for-owner/" + flowerId,
    method: "get",
    data: {
      flowerId: flowerId,
    },
  });
}

