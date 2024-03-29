import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { Wrapper } from "components/Wrapper";
import { InputField } from "components/InputField";
import { toErrorMap } from "utils/toErrorMap";

import { LOGIN_MUTATION } from "graphql/mutations/login";
import { createUrqlClient } from "utils/createUrqlClient";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, handleLogin] = useMutation(LOGIN_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await handleLogin(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // navigate to landing page
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='username or email'
              label='username or email'
            />

            <Box mt='4'>
              <InputField
                name='password'
                placeholder='******'
                label='Password'
                type='password'
              />
            </Box>

            <Link
              href={"/forgot-password"}
              style={{
                marginBottom: "12px",
                display: "block",
                textDecoration: "underline",
                textAlign: "right"
              }}
            >
              Forgot password?
            </Link>

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

export default withUrqlClient(createUrqlClient)(Login);
