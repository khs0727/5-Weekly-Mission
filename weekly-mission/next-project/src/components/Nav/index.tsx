import React from "react";
import Link from "next/link";
import Image from "next/image";
import profileImage from "../../images/profileimg.jpg";
import LinkbraryImage from "../../images/Linkbrary.png";
import useFolderData from "@api/useFolderData";
import styles from "./Nav.module.css";

const Nav = ({ folderId }: { folderId: string }) => {
  const { data, isLoading } = useFolderData(folderId);

  return (
    <nav className={styles.NavContainer}>
      <div className={styles.Gnb}>
        <div className={styles.GnbLogo}>
          <Link href="/">
            <Image
              src={LinkbraryImage}
              width={133}
              height={24}
              alt="Linkbrary Logo"
            />
          </Link>
        </div>
        {data ? (
          <div className={styles.ProfileInfo}>
            <Image src={profileImage} alt="프로필 이미지" />
            <span>{data.email}</span>
          </div>
        ) : (
          <Link href="/signin">
            <button className={styles.GnbButton}>로그인</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
