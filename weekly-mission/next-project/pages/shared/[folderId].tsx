import React, { useEffect, useState } from "react";
import Nav from "@components/Nav";
import Header from "@components/Header";
import CardList from "@components/CardList";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import instance from "lib/api";

function LinkShare() {
  const router = useRouter();
  const { folderId } = router.query;
  const [userId, setUserId] = useState<number | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);

  async function getFolder() {
    if (!folderId) {
      return;
    }

    const res = await instance.get(`/folders/${folderId}`);
    const folderData = res.data.data[0];
    const userIdFromResponse = folderData.user_id; // 폴더 데이터에서 user_id 추출
    const folderNameFromResponse = folderData.name;
    setUserId(userIdFromResponse);
    setFolderName(folderNameFromResponse);
  }

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <Layout>
      <Nav userId={userId} />
      <Header isFolderPage={false} userId={userId} folderName={folderName} />
      <CardList isFolderPage={false} />
      <Footer />
    </Layout>
  );
}
export default LinkShare;
