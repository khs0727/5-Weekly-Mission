import React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import useFolderList from "@api/useFolderList";
import AddFolderLink from "../AddFolderLinkBar";
import styles from "./Header.module.css";

const Header = ({ isFolderPage }: { isFolderPage: boolean }) => {
  const { data: folderData, isLoading } = useFolderList(1);

  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

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
          {folderData && (
            <div className={styles.folderinfo}>
              <Image
                className={styles.profileimage}
                src={folderData.folder.owner.profileImageSource}
                alt="폴더 소유자 프로필"
                width={60}
                height={60}
              />
              <span className={styles.ownername}>
                {folderData.folder.owner.name}
              </span>
              <h1 className={styles.foldername}>{folderData.folder.name}</h1>
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
