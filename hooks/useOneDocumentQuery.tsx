import { getDocumentCall, getOneDocumentCall } from "@/calls/DocumentCalls";
import { FilterOptions } from "@/db/types";
import { getToken } from "@/lib/auth";
import { useQuery } from "react-query"

export const useOneDocumentQuery = (id: string) => {
    const { data, isLoading } = useQuery(
        [id],
        () => {
          return getOneDocumentCall(id).then((response) => response)
        },
        {
          enabled: true,
        }
      )
      return { data, isLoading };

  };
  