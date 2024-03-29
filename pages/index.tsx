import { useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { createUrqlClient } from "utils/createUrqlClient";
import { POSTS_QUERY } from "graphql/queries/posts";
import Layout from "components/Layout";
import { UpdootSection } from "components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  });

  const [{ data, fetching }] = useQuery({
    query: POSTS_QUERY,
    variables
  });

  if (!fetching && !data) {
    return <div>You got no posts</div>;
  }

  return (
    <Layout>
      <Flex align={"center"}>
        <Heading>LiReddit</Heading>
        <Link
          href={"/create-post"}
          style={{
            color: "#08b",
            textDecoration: "underline",
            marginLeft: "auto"
          }}
        >
          create post
        </Link>
      </Flex>
      <br />
      {!data && fetching ? (
        <p>
          <i> Loading...</i>
        </p>
      ) : data ? (
        <>
          <Stack mt={8} gap={2}>
            {data.posts.posts.map((p: any) => (
              <Flex
                key={p.id}
                shadow='md'
                borderWidth='1px'
                padding={3}
                gap={4}
              >
                <UpdootSection points={p.points} id={p.id} />

                <Box>
                  <Heading fontSize='xl'>{p.title}</Heading>{" "}
                  <Text>Posted by: {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>

          {data && data.posts.hasMore ? (
            <Flex justify={"center"}>
              <Button
                my={8}
                isLoading={fetching}
                onClick={() =>
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt
                  })
                }
              >
                load more
              </Button>
            </Flex>
          ) : null}
        </>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  neverSuspend: true
})(Index);
