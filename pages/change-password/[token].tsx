import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  LinkOverlay
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { NextPage } from "next";

import { InputField } from "components/InputField";
import { Wrapper } from "components/Wrapper";
import { CHANGE_PASSWORD_MUTATION } from "graphql/mutations/change-password";
import { toErrorMap } from "utils/toErrorMap";
import { createUrqlClient } from "utils/createUrqlClient";
import Link from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, handleChangePassword] = useMutation(CHANGE_PASSWORD_MUTATION);

  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          setTokenError("");
          const response = await handleChangePassword({
            newPassword: values.newPassword,
            token
          });

          if (response.data.changePassword.errors) {
            console.log("error dey");
            const errorMap = toErrorMap(response.data.changePassword.errors);

            console.log({ errorMap });

            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.login.user) {
            // navigate to landing page
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {tokenError ? (
              <>
                <Alert status='error' mb='2'>
                  <AlertIcon />
                  <AlertTitle>Something went wrong!</AlertTitle>

                  <AlertDescription>{tokenError}</AlertDescription>
                </Alert>
                <Link
                  href={"/forgot-password"}
                  style={{
                    marginBottom: "12px",
                    display: "inline-block",
                    textDecoration: "underline"
                  }}
                >
                  Resend email
                </Link>
              </>
            ) : null}

            <InputField
              name='newPassword'
              placeholder='new password'
              label='new password'
              type='password'
            />

            <Button
              type='submit'
              colorScheme='blackAlpha'
              mt='6'
              isLoading={isSubmitting}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
