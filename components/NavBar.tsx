import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useMutation, useQuery } from "urql";
import NextLink from "next/link";

import { ME_QUERY } from "graphql/queries/me";
import { LOGOUT_MUTATION } from "graphql/mutations/logout";
import { isServer } from "utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useQuery({
    query: ME_QUERY,
    pause: isServer()
  });
  const [{ fetching: logoutFetching }, handleLogout] =
    useMutation(LOGOUT_MUTATION);

  return (
    <Flex bg='blackAlpha.700' p={4} position='sticky' top={0} zIndex={10}>
      <Box ml={"auto"}>
        {!data?.me ? (
          <>
            <Link as={NextLink} href='/login' mr={2} color='white'>
              login
            </Link>
            <Link as={NextLink} href='/register' color='white'>
              register
            </Link>
          </>
        ) : (
          <Flex gap={4}>
            <Box>{data.me.username}</Box>
            <Button
              variant={"link"}
              isLoading={logoutFetching}
              onClick={() => handleLogout()}
            >
              logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
