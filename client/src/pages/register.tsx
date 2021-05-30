import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";

const Register: React.FC<{}> = ({}) => {
  return (
    <Container varient={"small"}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values, actions);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <Box mt={10} />
            <FormField name="username" placeholder="Enter your user name" label="User Name" />
            <Box mt={5} />
            <FormField name="password" placeholder="Enter your password" label="Password" />
            <Box mt={5} />
            <Button
              mt={4}
              w={"100%"}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
