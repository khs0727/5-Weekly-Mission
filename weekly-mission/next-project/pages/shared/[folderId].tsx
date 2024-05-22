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

  async function getFolder() {
    const res = await instance.get(`/folders/${folderId}`);
    const folderData = res.data;
    const userIdFromResponse = folderData.user_id; // 폴더 데이터에서 user_id 추출
    setUserId(userIdFromResponse);
  }

  useEffect(() => {
    getFolder();
  }, [folderId]);

  return (
    <Layout>
      <Nav userId={userId} />
      <Header isFolderPage={false} />
      <CardList isFolderPage={false} />
      <Footer />
    </Layout>
  );
}
export default LinkShare;
