import { FilterOptions } from "@/db/types";
import { useQuery } from "react-query"

export const useDocumentQuery = (filter: FilterOptions) => {
    const { data, isLoading } = useQuery(
        [filter],
        () => {
          return fetch("/api/documents/", {
            method: "GET",
            headers: { "Content-Type": "application/json", ...filter},
          }).then((response) => response.json())
        },
        {
          enabled: true,
        }
      )
      return { data, isLoading };

  };
  