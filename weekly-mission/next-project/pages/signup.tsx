import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import instance from "lib/api";
import styles from "@/styles/sign.module.css";
import Form from "@components/Form";

function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/folder");
    }
  }, []);

  const checkEmailDuplication = async (email: string) => {
    try {
      // 이메일 중복 확인 요청
      const response = await instance.post(`/check-email`, { email });
      if (response.status === 200) {
        // 중복되지 않은 경우
        setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
      }
    } catch (error) {
      // 중복된 경우
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "이미 사용 중인 이메일입니다.",
      }));
    }
  };

  const handleSignup = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    try {
      const response = await instance.post(`/sign-up`, {
        email,
        password,
      });
      if (response.status === 200) {
        //회원가입 성공
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        router.push("/folder");
      } else {
        //회원가입 실패
        console.error("Sign up failed");
      }
    } catch (error) {
      setErrors({
        email: "이미 사용중인 이메일입니다.",
        password: "비밀번호 오류입니다.",
      });
    }
  };

  return (
    <div className={styles.sign_container}>
      <Form
        onSubmit={handleSignup}
        checkEmailDuplication={checkEmailDuplication}
        headermessage="이미 회원이신가요?"
        headerlink="로그인 하기"
        buttonText="회원가입"
        socialProvidersText="다른 방식으로 가입하기"
        isPasswordConfirmation={true}
        isSignUp={true}
        errorMessage={errors}
      />
    </div>
  );
}

export default SignupPage;
