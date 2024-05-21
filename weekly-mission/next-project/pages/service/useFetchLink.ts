import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import instance from "lib/api";

export interface LinkData {
  data: {
    id: number;
    title: string;
    created_at: string;
    url: string;
    description?: string;
    image_source?: string;
  }[];
}

export async function useFetchLinks(userId: number, folderId: number) {
  const [links, setLinks] = useState<LinkData>({ data: [] });

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response: AxiosResponse<LinkData> = await instance.get(
          `/api/users/${userId}/links`,
          {
            params: {
              folderId: folderId,
            },
          }
        );
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    }

    if (folderId) {
      fetchLinks();
    }
  }, [userId, folderId]);

  return links;
}
