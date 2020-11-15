import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";

const Navbar = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          BDS
        </Heading>
      </Flex>

      <Box display={{ base: "block" }} mt={{ base: 4, md: 0 }}>
        <Button data-testid="logout-btn" bg="transparent" border="1px">
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
