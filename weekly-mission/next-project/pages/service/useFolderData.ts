import { useState, useEffect } from "react";
import instance from "lib/api";

interface FolderData {
  email: string;
  id: number;
  name: string;
  profileImageSource: string;
}

const useFolderData = (
  folderId: string
): {
  data: FolderData | null;
  isLoading: boolean;
} => {
  const [data, setData] = useState<FolderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/folders/${folderId}`
        );
        const fetchedData: FolderData = await response.data.data;

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching folder data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [folderId]);

  return { data, isLoading };
};

export default useFolderData;
