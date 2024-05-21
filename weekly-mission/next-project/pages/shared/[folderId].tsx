import React from "react";
import Nav from "@components/Nav";
import Header from "@components/Header";
import CardList from "@components/CardList";
import Footer from "@components/Footer";
import Layout from "@components/Layout";
import { useRouter } from "next/router";

function LinkShare() {
  const router = useRouter();
  const folderId = router.query.folderId as string;

  return (
    <Layout>
      <Nav folderId={folderId} />
      <Header isFolderPage={false} />
      <CardList isFolderPage={false} />
      <Footer />
    </Layout>
  );
}
export default LinkShare;
