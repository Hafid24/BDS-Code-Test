import React, { useState } from "react";
import { Link as A, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import {
  ThemeProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button
} from "@chakra-ui/react";

const VARIANT_COLOR = "teal";

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <LoginArea login={login} isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
};

const LoginArea = ({ login, isAuthenticated }) => {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      data-testid="login"
    >
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm login={login} isAuthenticated={isAuthenticated} />
        </Box>
      </Box>
    </Flex>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Login to Your Account</Heading>
    </Box>
  );
};

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  console.log(email, password);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => onChange(e)}
            name="email"
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => onChange(e)}
            name="password"
            required
          />
        </FormControl>

        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Checkbox colorScheme="green" defaultIsChecked>
              Remember Me
            </Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`}>
              {" "}
              <A to="/register">Create an account</A>
            </Link>
          </Box>
        </Stack>

        <Button
          variantColor={VARIANT_COLOR}
          width="full"
          mt={4}
          onClick={(e) => onSubmit(e)}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
