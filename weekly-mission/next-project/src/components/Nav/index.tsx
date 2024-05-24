import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import profileImage from "../../images/profileimg.jpg";
import LinkbraryImage from "../../images/Linkbrary.png";
import styles from "./Nav.module.css";
import instance from "lib/api";

export interface User {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
}

interface NavProps {
  userId?: number | null;
  user?: User | null;
}

const Nav = ({ userId, user }: NavProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function getUser() {
    const res = await instance.get(`/users/${userId}`);
    const userData: User = res.data.data[0];
    setCurrentUser(userData);
  }

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else if (userId) {
      getUser();
    }
  }, [userId]);

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
        {currentUser ? (
          <div className={styles.ProfileInfo}>
            <Image src={profileImage} alt="프로필 이미지" />
            <span>{currentUser.email}</span>
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
