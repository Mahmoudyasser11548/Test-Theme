import apisauce from "apisauce";

const baseURL = process.env.VITE_BASE_API_URL;

export const api = apisauce.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
  },
  timeout: 1200000, //30 sec
});

api.addAsyncResponseTransform((response) => async () => {
  if (!response.ok) {
    const customeError = {
      errors: response.data.errors || [{ errorMessage: response.data.message }],
      errorMessage: response.data.message,
      status: response.status,
      codeNumber: response.data.codeNumber,
      requestId: response.data.requestId,
    };
    response.data = customeError;
  }
});

api.addAsyncRequestTransform((request) => async () => {
  const token = localStorage.getItem("jwtToken");
  const culture = localStorage.getItem("culture");
  const cultureCode = localStorage.getItem("cultureCode");
  const userIp = localStorage.getItem("userIp");
  const tenantId = localStorage.getItem("t__id");

  request.headers["culture"] = culture || "en";
  request.headers["cultureCode"] = cultureCode || "en-US";
  request.headers["userIp"] = userIp || "";
  if (tenantId) {
    request.headers["tenantId"] = tenantId;
  }

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete request.headers["Authorization"];
  }
});
