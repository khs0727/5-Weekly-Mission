import React from "react";
import styles from "./AllButton.module.css";

interface AllButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const AllButton = ({ isActive, onClick }: AllButtonProps) => {
  return (
    <button
      className={`${styles.allbutton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      전체
    </button>
  );
};

export default AllButton;
