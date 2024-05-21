import React from "react";
import { useState, memo } from "react";
import shareIcon from "../../images/share.svg";
import deleteIcon from "../../images/delete.png";
import renameIcon from "../../images/pen.png";
import Image from "next/image";
import styles from "./ActionButton.module.css";

interface ActiveButtonProps {
  handleModalToggle: (modalType: string) => void;
}

const ActionButton = ({ handleModalToggle }: ActiveButtonProps) => {
  return (
    <div className={styles.button_container}>
      <div className={styles.actionbutton}>
        <Image
          className={styles.actionbutton_image}
          src={shareIcon}
          alt="공유아이콘"
          width={18}
          height={18}
        />
        <button
          className={styles.custombutton}
          onClick={() => handleModalToggle("shareFolder")}
        >
          공유
        </button>
      </div>

      <div className={styles.actionbutton}>
        <Image
          className={styles.actionbutton_image}
          src={renameIcon}
          alt="이름 변경 아이콘"
          width={18}
          height={18}
        />
        <button
          className={styles.custombutton}
          onClick={() => handleModalToggle("renameFolder")}
        >
          이름 변경
        </button>
      </div>

      <div className={styles.actionbutton}>
        <Image
          className={styles.actionbutton_image}
          src={deleteIcon}
          alt="삭제 아이콘"
          width={18}
          height={18}
        />
        <button
          className={styles.custombutton}
          onClick={() => handleModalToggle("deleteFolder")}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default memo(ActionButton);
