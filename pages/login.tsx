import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";

import { Wrapper } from "components/Wrapper";
import { InputField } from "components/InputField";
import { toErrorMap } from "utils/toErrorMap";

import { LOGIN_MUTATION } from "graphql/mutations/login";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, handleLogin] = useMutation(LOGIN_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await handleLogin({ options: values });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // navigate to landing page
            router.push("/");
          }
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
