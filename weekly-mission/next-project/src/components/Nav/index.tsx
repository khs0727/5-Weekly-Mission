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

const Nav = ({ userId }: { userId: number | null }) => {
  const [user, setUser] = useState<User | null>(null);

  async function getUser() {
    const res = await instance.get(`/users/${userId}`);
    const userData: User = res.data.data[0];
    setUser(userData);
  }

  useEffect(() => {
    if (userId) {
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
        {user ? (
          <div className={styles.ProfileInfo}>
            <Image src={profileImage} alt="프로필 이미지" />
            <span>{user.email}</span>
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
