import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import instance from "lib/api";
import styles from "@/styles/sign.module.css";
import Form from "@components/Form";

function SigninPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  /*useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/folder");
    }
  }, []);*/

  const handleSignIn = async (data: any) => {
    const { email, password } = data;

    try {
      const response = await instance.post(`/sign-in`, { email, password });
      if (response.status === 200) {
        // 로그인 성공
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        router.push("/folder");
      } else {
        // 로그인 실패
        console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({
        email: "이메일을 확인해 주세요.",
        password: "비밀번호를 확인해 주세요.",
      });
    }
  };

  return (
    <div className={styles.sign_container}>
      <Form
        onSubmit={handleSignIn}
        headermessage="회원이 아니신가요?"
        headerlink="회원가입 하기"
        buttonText="로그인"
        socialProvidersText="소셜 로그인"
        isPasswordConfirmation={false}
        isSignUp={false}
        errorMessage={errors}
      />
    </div>
  );
}

export default SigninPage;
