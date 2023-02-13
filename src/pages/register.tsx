import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface RegisterProps {}

const REGISTER_MUTATION = `
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      errors {
        field
        message
      } 
      user {
        createdAt
        id
        username
      }
    }
  }
`;

const Register: React.FC<RegisterProps> = ({}) => {
  const [, registerFn] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return registerFn(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='username'
            />

            <Box mt='4'>
              <InputField
                name='password'
                placeholder='******'
                label='Password'
                type='password'
              />
            </Box>

            <Button
              type='submit'
              colorScheme='blackAlpha'
              mt='6'
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
