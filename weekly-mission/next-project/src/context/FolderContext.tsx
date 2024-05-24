import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import instance from "lib/api";
import router from "next/router";

// Context 생성
const UserContext = createContext<any>(null);
const FolderContext = createContext<any>(null);

// Provider 컴포넌트 생성
export const FolderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const getUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/signin");
    } else {
      try {
        const res = await instance.get("/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getFoldersList = async (folderId?: string) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await instance.get("/folders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFolders(res.data);
      if (folderId) {
        setSelectedFolder(folderId);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const getLinks = async (folderId?: string) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = folderId
        ? await instance.get(`/links?folderId=${folderId}`)
        : await instance.get("/links", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      setLinks(res.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    getUser();
    getFoldersList();
    getLinks();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      <FolderContext.Provider
        value={{
          folders,
          selectedFolder,
          setSelectedFolder,
          getFoldersList,
          links,
          getLinks,
        }}
      >
        {children}
      </FolderContext.Provider>
    </UserContext.Provider>
  );
};

// Custom hooks
export const useUser = () => useContext(UserContext);
export const useFolder = () => useContext(FolderContext);
