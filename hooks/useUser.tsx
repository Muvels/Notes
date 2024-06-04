import { useQuery } from "react-query"

export const useUser = () => {
    const { data, isLoading } = useQuery(
        "user",
        () => {
          return fetch("/api/view/user", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }).then((response) => response.json())
        },
        {
          enabled: true,
        }
      )
  
      return { data, isLoading };

  };
