import React, { useState } from "react";
import { Link as A, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

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
  Select,
  Stack,
  Checkbox,
  Button
} from "@chakra-ui/react";

const VARIANT_COLOR = "teal";

const Register = ({ register, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <RegisterArea register={register} isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
};

const RegisterArea = ({ register, isAuthenticated }) => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
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
          <RegisterHeader />
          <RegisterForm register={register} isAuthenticated={isAuthenticated} />
        </Box>
      </Box>
    </Flex>
  );
};

const RegisterHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Create a new Account</Heading>
    </Box>
  );
};

const RegisterForm = ({ register }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    usertype: ""
  });

  const { username, firstname, lastname, email, password, usertype } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register(username, firstname, lastname, email, password, usertype);
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
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            placeholder="Enter your username"
            onChange={(e) => onChange(e)}
            name="username"
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Firstname</FormLabel>
          <Input
            type="firstname"
            placeholder="Enter your firstname"
            onChange={(e) => onChange(e)}
            name="firstname"
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Lastname</FormLabel>
          <Input
            type="lastname"
            placeholder="Enter your lastname"
            onChange={(e) => onChange(e)}
            name="lastname"
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

        <FormControl mt={4}>
          <FormLabel>User Type</FormLabel>
          <Select
            placeholder="Select usertype"
            name="usertype"
            onChange={(e) => onChange(e)}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
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
              <A to="/login">Login instead. </A>
            </Link>
          </Box>
        </Stack>

        <Button
          variantColor={VARIANT_COLOR}
          width="full"
          mt={4}
          onClick={(e) => onSubmit(e)}
        >
          Sign up
        </Button>
      </form>
    </Box>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
