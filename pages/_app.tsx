import { ChakraProvider } from "@chakra-ui/react";
import {
  Provider,
  createClient,
  dedupExchange,
  fetchExchange,
  Query
} from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";

import theme from "../theme";
import { AppProps } from "next/app";
import {
  LoginMutationMutation,
  MeDocument,
  MeQuery,
  RegisterPatientMutationMutation
} from "gql/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:6380/graphql",
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          loginMutation: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutationMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user
                  };
                }
              }
            );
          },
          registerMutation: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterPatientMutationMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user
                  };
                }
              }
            );
          }
        }
      }
    }),
    fetchExchange
  ]
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
