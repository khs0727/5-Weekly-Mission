import React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import useFolderList from "@api/useFolderList";
import AddFolderLink from "../AddFolderLinkBar";
import { User } from "@components/Nav";
import styles from "./Header.module.css";
import instance from "lib/api";

interface HeaderProps {
  isFolderPage: boolean;
  userId: number | null;
  folderName: string | null;
}

const Header = ({ isFolderPage, userId, folderName }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <header className={styles.headercontainer} ref={headerRef}>
      {isFolderPage ? (
        <AddFolderLink />
      ) : (
        <div className={styles.folderinfo_container}>
          {user && (
            <div className={styles.folderinfo}>
              <Image
                className={styles.profileimage}
                src={user.image_source}
                alt="폴더 소유자 프로필"
                width={60}
                height={60}
              />
              <span className={styles.ownername}>{user.name}</span>
              <h1 className={styles.foldername}>{folderName}</h1>
            </div>
          )}
        </div>
      )}

      {isFolderPage && isSticky && (
        <div className={styles.sticky_container}>
          {isFolderPage && <AddFolderLink />}
        </div>
      )}
    </header>
  );
};

export default Header;
