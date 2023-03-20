import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { createUrqlClient } from "utils/createUrqlClient";
import { InputField } from "components/InputField";
import Layout from "components/Layout";

import { CREATE_POST_MUTATION } from "graphql/mutations/create-post";

function CreatePost() {
  const router = useRouter();
  const [, handleCreatePost] = useMutation(CREATE_POST_MUTATION);

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await handleCreatePost({ input: values });
          if (error.message.includes("not authenticated")) {
            router.push("/login");
          }
          router.push("/");
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
