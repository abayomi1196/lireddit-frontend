import { useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { createUrqlClient } from "utils/createUrqlClient";
import { POSTS_QUERY } from "graphql/queries/posts";
import Layout from "components/Layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Index = () => {
  const [{ data, fetching }] = useQuery({
    query: POSTS_QUERY,
    variables: {
      limit: 5
    }
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
            {data.posts.map((p: any) => (
              <Box key={p.id} shadow='md' borderWidth='1px' padding={3}>
                <Heading fontSize='xl'>{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            ))}
          </Stack>

          <Flex justify={"center"}>
            <Button my={8} isLoading={fetching}>
              load more
            </Button>
          </Flex>
        </>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  neverSuspend: true
})(Index);
