import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button
} from "@chakra-ui/react";
import { InputField } from "components/InputField";
import { Wrapper } from "components/Wrapper";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { useMutation } from "urql";

import { createUrqlClient } from "utils/createUrqlClient";
import { FORGOT_PASSWORD_MUTATION } from "graphql/mutations/forgot-password";

const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const [, handleForgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await handleForgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Successful!</AlertTitle>

              <AlertDescription>Email sent</AlertDescription>
            </Alert>
          ) : (
            <Form>
              <InputField
                name='email'
                placeholder='email address'
                label='email'
                type='email'
              />

              <Button
                type='submit'
                colorScheme='blackAlpha'
                mt='6'
                isLoading={isSubmitting}
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
