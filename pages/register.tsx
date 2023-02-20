import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";

import { Wrapper } from "components/Wrapper";
import { InputField } from "components/InputField";
import { toErrorMap } from "utils/toErrorMap";

import { REGISTER_MUTATION } from "graphql/mutations/register";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, handleRegister] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await handleRegister({ options: values });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
