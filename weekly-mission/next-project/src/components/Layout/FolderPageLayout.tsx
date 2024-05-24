import { ModalProvider } from "src/context/ModalContext";
import Nav, { User } from "@components/Nav";
import Header from "@components/Header";
import CardList from "@components/CardList";
import Footer from "@components/Footer";
import Layout from "@components/Layout";

function FolderPageLayout({ user }) {
  return (
    <ModalProvider>
      <Layout>
        <Nav user={user} />
        <Header isFolderPage={true} />
        <CardList isFolderPage={true} />
        <Footer />
      </Layout>
    </ModalProvider>
  );
}

export default FolderPageLayout;
