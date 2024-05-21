import React from "react";
import SearchBar from "@components/Searchbar";
import Folder from "../Folder";
import useFolderList from "@api/useFolderList";
import { memo } from "react";
import Card from "../Card";
import styles from "./CardList.module.css";
import { useFetchLinks } from "@api/useFetchLink";

interface CardListProps {
  isFolderPage: boolean;
}

const CardList = ({ isFolderPage }: CardListProps) => {
  const userId = 1;
  const folderId = "";
  const { data: folderData, isLoading } = useFolderList(1);

  if (isLoading) return <div>Loading...</div>;
  if (!folderData) return null;

  return (
    <div className={styles.cardlist_wrapper}>
      {isFolderPage ? (
        <Folder folderId={folderId} />
      ) : (
        <>
          <SearchBar />
          <div className={styles.cardlist_container}>
            {folderData.folder.links.map((link: any) => (
              <Card key={link.id} link={link} isFolderPage={isFolderPage} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(CardList);
