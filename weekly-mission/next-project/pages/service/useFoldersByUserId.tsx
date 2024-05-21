import { useState, useEffect } from "react";

interface Link {
  count: number;
}

export interface Folder {
  data: {
    id: number;
    name: string;
    created_at: string;
    favorite: boolean;
    link: Link;
    user_id: number;
  }[];
}

interface useFoldersByUserIdResponse {
  data: Folder | null;
  isLoading: boolean;
}

const useFoldersByUserId = (userId: number): useFoldersByUserIdResponse => {
  const [data, setData] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`
        );
        const fetchedData: Folder = await response.json();

        if (fetchedData !== null) {
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching folders data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { data, isLoading };
};

export default useFoldersByUserId;

/*${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/folders*/
