import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
