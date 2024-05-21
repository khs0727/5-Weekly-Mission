import { useState, useEffect } from "react";
import instance from "lib/api";
import { AxiosResponse } from "axios";

interface Owner {
  id: number;
  name: string;
  profileImageSource: string;
}

interface Link {
  id: number;
  createdAt: string;
  url: string;
  title?: string;
  description?: string;
  imageSource?: string;
}

interface FolderData {
  folder: {
    id: number;
    name: string;
    count: number;
    owner: Owner;
    links: Link[];
  };
}

interface FolderListState {
  data: FolderData | null;
  isLoading: boolean;
}

const useFolderList = (userId: number): FolderListState => {
  const [data, setData] = useState<FolderData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<FolderData> = await instance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/sample/folder`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching folders data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
};

export default useFolderList;

//${process.env.NEXT_PUBLIC_BASE_URL}/sample/folder
