import axios from "axios";
import { useRouter } from "next/router";

const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api",
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터
// 요청 인터셉터
instance.interceptors.request.use(
  function (config) {
    // 스토리지에서 토큰을 가져온다.
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다.
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  function (error) {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 && data.message === "InvalidTokenException") {
      // 토큰이 없거나 잘못되었을 경우
      logout();
    }
    if (status === 401 && data.message === "TokenExpired") {
      try {
        const tokenRefreshResult = await instance.post("/refresh-token");
        if (tokenRefreshResult.status === 200) {
          const { accessToken, refreshToken } = tokenRefreshResult.data;
          // 새로 발급받은 토큰을 스토리지에 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          // 토큰 갱신 성공. API 재요청
          return instance(config);
        } else {
          logout();
        }
      } catch (e) {
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
