import React, { useEffect, useState } from "react";
import SearchBar from "@components/Searchbar";
import Folder from "../Folder";
import { memo } from "react";
import Card from "../Card";
import styles from "./CardList.module.css";
import instance from "lib/api";
interface Link {
  id: number;
  created_at: string;
  updated_at: string | null;
  url: string;
  title: string;
  description: string;
  image_source: string;
  folder_id: number | null;
}

interface CardListProps {
  isFolderPage: boolean;
  userId: number | null;
  folderId: string | string[] | undefined;
}

const CardList = ({ isFolderPage, userId, folderId }: CardListProps) => {
  const [links, setLinks] = useState<Link[]>([]);

  async function getLinks() {
    if (!userId) {
      return;
    }

    let url = `/users/${userId}/links`;
    if (folderId) {
      url += `?folderId=${folderId}`;
    }

    const res = await instance.get(url);
    const linksData = res.data.data;
    setLinks(linksData);
  }

  useEffect(() => {
    getLinks();
  }, [userId, folderId]);

  return (
    <div className={styles.cardlist_wrapper}>
      {isFolderPage ? (
        <Folder folderId={folderId} />
      ) : (
        <>
          <SearchBar />
          <div className={styles.cardlist_container}>
            {links ? (
              links.map((link) => (
                <Card key={link.id} link={link} isFolderPage={isFolderPage} />
              ))
            ) : (
              <p>No links available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(CardList);
