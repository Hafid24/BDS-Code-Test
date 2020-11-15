import React from "react";
import {
  ThemeProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  IconButton,
  useColorMode,
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

const Register = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <RegisterArea />
    </ThemeProvider>
  );
};

const RegisterArea = () => {
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
        <ThemeSelector />
        <Box p={4}>
          <RegisterHeader />
          <RegisterForm />
        </Box>
      </Box>
    </Flex>
  );
};

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4}>
      <IconButton
        icon={colorMode === "light" ? "moon" : "sun"}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Box>
  );
};

const RegisterHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Craete a new Account</Heading>
    </Box>
  );
};

const RegisterForm = () => {
  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email address" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Username</FormLabel>
          <Input type="username" placeholder="Enter your username" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Firstname</FormLabel>
          <Input type="firstname" placeholder="Enter your firstname" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Lastname</FormLabel>
          <Input type="lastname" placeholder="Enter your lastname" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Checkbox colorScheme="green" defaultIsChecked>
              Remember Me
            </Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`}>Login instead.</Link>
          </Box>
        </Stack>

        <Button variantColor={VARIANT_COLOR} width="full" mt={4}>
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default Register;
