import { useQuery } from "urql";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ME_QUERY } from "graphql/queries/me";
import { isServer } from "utils/isServer";

export const useIsAuth = () => {
  const router = useRouter();

  const [{ data, fetching }] = useQuery({
    query: ME_QUERY,
    pause: isServer()
  });

  useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace("/login");
    }
  }, [data, router]);
};
