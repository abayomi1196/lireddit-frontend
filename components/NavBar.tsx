import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useQuery } from "urql";
import NextLink from "next/link";

import { ME_QUERY } from "graphql/queries/me";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useQuery({ query: ME_QUERY });

  if (fetching) {
    return null;
  }

  return (
    <Flex bg='blackAlpha.200' p={4}>
      <Box ml={"auto"}>
        {!data.me ? (
          <>
            <Link as={NextLink} href='/login' mr={2} color='black'>
              login
            </Link>
            <Link as={NextLink} href='/register' color='black'>
              register
            </Link>
          </>
        ) : (
          <Flex gap={4}>
            <Box>{data.me.username}</Box>
            <Button variant={"link"}>logout</Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
