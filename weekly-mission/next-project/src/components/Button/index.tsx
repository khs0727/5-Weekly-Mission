import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: string;
}

const Button = ({ children, btnType, onClick }: ButtonProps) => {
  const buttonClass =
    btnType === "primary"
      ? styles.primary
      : btnType === "red"
      ? styles.red
      : "";
  return (
    <button
      className={`${styles.StyledButton} ${buttonClass}`}
      onClick={onClick}
      color-type={btnType}
    >
      {children}
    </button>
  );
};

export default Button;
