import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation, useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { createUrqlClient } from "utils/createUrqlClient";
import { InputField } from "components/InputField";
import Layout from "components/Layout";

import { CREATE_POST_MUTATION } from "graphql/mutations/create-post";
import { ME_QUERY } from "graphql/queries/me";
import { isServer } from "utils/isServer";

function CreatePost() {
  const router = useRouter();
  const [{ data, fetching }] = useQuery({
    query: ME_QUERY,
    pause: isServer()
  });
  const [, handleCreatePost] = useMutation(CREATE_POST_MUTATION);

  useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace("/login");
    }
  }, [data, router]);

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await handleCreatePost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='title' label='title' />

            <Box mt='4'>
              <InputField
                textarea
                name='text'
                placeholder='text...'
                label='body'
              />
            </Box>

            <Button
              type='submit'
              colorScheme='blackAlpha'
              mt='6'
              isLoading={isSubmitting}
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(CreatePost);
