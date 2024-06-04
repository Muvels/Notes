import { getDocumentCall, getOneDocumentCall } from "@/calls/DocumentCalls";
import useDocumentStore from "@/store/store";
import { useQuery } from "react-query"


export const useOneDocumentQuery = (id: string) => {
  const { fetchDocument } = useDocumentStore();
    const { data, isLoading } = useQuery(
        [id],
        () => {
          return new Promise(() => {}).then((response) => response)
        },
        {
          enabled: true,
        }
      )
      return { data, isLoading };

  };
  