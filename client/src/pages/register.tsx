import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../utills/auth";
import { useRouter } from "next/router";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [register, { data }] = useLoginMutation();

  return (
    <Container varient={"small"}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const { data } = await register({
            variables: values,
          });

          if (data?.login?.accessToken) {
            setAccessToken(data.login.accessToken);
            router.push('/');
          }

          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Box mt={10} />
            <FormField
              name="username"
              placeholder="Enter your user name"
              label="Username"
            />
            <Box mt={5} />
            <FormField
              name="password"
              placeholder="Enter your password"
              label="Password"
            />
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
