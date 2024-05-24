import React, { useEffect } from "react";
import { useUser, useFolder } from "src/context/FolderContext";
import FolderPageLayout from "@components/Layout/FolderPageLayout";

function FolderPage() {
  const { user, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return <FolderPageLayout user={user} />;
}

export default FolderPage;
