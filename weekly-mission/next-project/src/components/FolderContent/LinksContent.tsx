import React from "react";
import Card from "@components/Card";
import NoLink from "@components/NoLink";
import ActionButton from "@components/ActionButton";
import Modal from "@components/Modal";
import { useModal } from "src/context/ModalContext";
import { Folder } from "pages/service/useFoldersByUserId";

import styles from "./LinksContent.module.css";

interface LinksContentProps {
  foldersData: Folder;
  linksData: {
    id: number;
    title: string;
    created_at: string;
    url: string;
    description?: string;
    image_source?: string;
  }[];
  activeFolderName: string;
  activeFolderId: number;
}

const LinksContent = ({
  foldersData,
  linksData,
  activeFolderName,
  activeFolderId,
}: LinksContentProps) => {
  const isEmpty = !linksData || linksData.length === 0;
  const { modalState, openModal, closeModal } = useModal();

  const handleModalToggle = (modalType: string) => {
    if (modalState[modalType]) {
      return closeModal(modalType);
    }
    return openModal(modalType);
  };

  return (
    <>
      <div className={styles.foldermenu_toolbar}>
        <div className={styles.foldermenu_selectedfolder}>
          {activeFolderName}
        </div>
        {activeFolderId !== null && (
          <ActionButton handleModalToggle={handleModalToggle} />
        )}
      </div>

      <div className={styles.folder_containter}>
        {isEmpty ? (
          <NoLink />
        ) : (
          linksData.map((link) => (
            <Card key={link.id} link={link} isFolderPage={true} />
          ))
        )}
      </div>

      {modalState.shareFolder && (
        <Modal
          activeFolderId={activeFolderId}
          text="폴더 공유"
          content={activeFolderName}
          showShareIcons={true}
          onClick={() => closeModal("shareFolder")}
        />
      )}
      {modalState.renameFolder && (
        <Modal
          text="폴더 이름 변경"
          showButton={true}
          buttonText="변경하기"
          buttonType="primary"
          showInput={true}
          onClick={() => closeModal("renameFolder")}
        />
      )}
      {modalState.deleteFolder && (
        <Modal
          text="폴더 삭제"
          showButton={true}
          buttonText="삭제하기"
          buttonType="red"
          content={activeFolderName}
          onClick={() => closeModal("deleteFolder")}
        />
      )}

      {modalState.deleteLink && (
        <Modal
          text="링크 삭제"
          showButton={true}
          buttonText="삭제하기"
          buttonType="red"
          content={"링크 주소"}
          onClick={() => closeModal("deleteLink")}
        />
      )}

      {modalState.addLink && (
        <Modal
          text="폴더에 추가"
          showButton={true}
          buttonText="추가하기"
          buttonType="primary"
          content="링크 주소"
          folderMenu={foldersData.data.map((folder) => folder.name)}
          linkCount={foldersData.data.map((folder) =>
            folder.link ? folder.link.count : 0
          )}
          onClick={() => closeModal("addLink")}
        />
      )}
    </>
  );
};

export default LinksContent;
