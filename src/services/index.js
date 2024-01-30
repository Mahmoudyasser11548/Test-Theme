import axios from "axios";

const baseURL = process.env.VITE_APP_BASE_API_URL;

const createApi = () => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    timeout: 1200000, // 30 seconds
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const customError = {
          errors: error.response.data.errors || [
            // eslint-disable-next-line array-bracket-newline
            { errorMessage: error.response.data.message },
          ],
          errorMessage: error.response.data.message,
          status: error.response.status,
          codeNumber: error.response.data.codeNumber,
          requestId: error.response.data.requestId,
        };
        error.response.data = customError;
      }
      return Promise.reject(error);
    },
  );

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");
    const culture = localStorage.getItem("culture");
    const cultureCode = localStorage.getItem("cultureCode");
    const userIp = localStorage.getItem("userIp");
    const tenantId = localStorage.getItem("t__id");

    config.headers["culture"] = culture || "en";
    config.headers["cultureCode"] = cultureCode || "en-US";
    config.headers["userIp"] = userIp || "";
    if (tenantId) {
      config.headers["tenantId"] = tenantId;
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  });

  return api;
};

const api = createApi();

export default api;
