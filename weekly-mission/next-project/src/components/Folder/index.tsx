import React, { useCallback } from "react";
import { useState, useEffect, memo } from "react";
import SearchBar from "@components/Searchbar";
import FolderMenuList from "@components/FolderMenuList";
import FolderContent from "@components/FolderContent";
import AddButton from "@components/AddButton";
import { useFetchLinks } from "@api/useFetchLink";
import { LinkData } from "@api/useFetchLink";
import useFoldersByUserId from "pages/service/useFoldersByUserId";
import styles from "./Folder.module.css";
import { useFolder } from "src/context/FolderContext";
import instance from "lib/api";

export type FolderId = number | string | null;

interface FolderProps {
  folderId: string | string[] | null | undefined;
}

const Folder = ({ folderId }: FolderProps) => {
  const {
    folders,
    links,
    selectedFolder,
    setSelectedFolder,
    getFoldersList,
    getLinks,
  } = useFolder();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (folderId !== null) {
      setSelectedFolder(folderId);
      getLinks(folderId);
    }
  }, [folderId, setSelectedFolder, getLinks]);

  const handleButtonClick = useCallback(
    (folderId, folderName) => {
      if (folderId !== selectedFolder) {
        setSelectedFolder(folderId);
      }
    },
    [selectedFolder, setSelectedFolder]
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getFilteredLink = useCallback(() => {
    if (!links) {
      return [];
    }

    if (search === "") {
      return links;
    }

    const lowerSearch = search.toLowerCase();

    return links.filter(
      (link: { url: string; title: string; description: string }) => {
        return (
          (link.url && link.url.toLowerCase().includes(lowerSearch)) ||
          (link.title && link.title.toLowerCase().includes(lowerSearch)) ||
          (link.description &&
            link.description.toLowerCase().includes(lowerSearch))
        );
      }
    );
  }, [links, search]);

  const filteredLinks = getFilteredLink();

  if (!folders) return null;

  return (
    <>
      <SearchBar value={search} onChange={onChangeSearch} />
      <div className={styles.foldermenu_toolbar}>
        <FolderMenuList
          folders={folders}
          activeButtonId={selectedFolder}
          handleButtonClick={handleButtonClick}
        />
        <AddButton />
      </div>

      <FolderContent
        foldersData={folders}
        allLinksData={filteredLinks}
        activeFolderName={
          selectedFolder
            ? folders.find(
                (folder: { id: any }) => folder.id === selectedFolder
              )?.name
            : "전체"
        }
        activeFolderId={selectedFolder}
      />
    </>
  );
};

export default memo(Folder);
