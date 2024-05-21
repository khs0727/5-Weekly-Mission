import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: string;
}

const Button = ({ children, btnType, onClick, ...rest }: ButtonProps) => {
  const buttonClass = btnType ? styles[btnType] : "";
  return (
    <button
      className={`${styles.StyledButton} ${buttonClass}`}
      onClick={onClick}
      color-type={btnType}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
