import { useEffect } from "react";
import { useRouter } from "next/router";
import FolderPageLayout from "@components/Layout/FolderPageLayout";
import { useFolder, useUser } from "src/context/FolderContext";

function FolderIdPage() {
  const router = useRouter();
  const { folderId } = router.query;
  const { user, getUser } = useUser();

  useEffect(() => {
    if (folderId) {
      getUser();
    }
  }, [folderId]);

  return <FolderPageLayout user={user} />;
}

export default FolderIdPage;
