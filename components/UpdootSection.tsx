import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "urql";

import { VOTE_MUTATION } from "graphql/mutations/vote";

interface UpdootSectionProps {
  points: number;
  id: number;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ points, id }) => {
  const [, handleVote] = useMutation(VOTE_MUTATION);
  const [isLoading, setIsLoading] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  return (
    <Flex flexDir={"column"} alignItems='center' justifyContent={"center"}>
      <IconButton
        aria-label='updoot post'
        icon={<ChevronUpIcon />}
        onClick={async () => {
          setIsLoading("updoot-loading");
          await handleVote({ postId: id, value: 1 });
          setIsLoading("not-loading");
        }}
        isLoading={isLoading === "updoot-loading"}
      />

      <Box>{points}</Box>

      <IconButton
        aria-label='downdoot post'
        icon={<ChevronDownIcon />}
        onClick={async () => {
          setIsLoading("downdoot-loading");
          await handleVote({ postId: id, value: -1 });
          setIsLoading("not-loading");
        }}
        isLoading={isLoading === "downdoot-loading"}
      />
    </Flex>
  );
};
