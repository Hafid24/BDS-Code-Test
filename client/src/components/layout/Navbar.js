import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated } }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          BDS
        </Heading>
      </Flex>

      {isAuthenticated && (
        <Box display={{ base: "block" }} mt={{ base: 4, md: 0 }}>
          <Button
            data-testid="logout-btn"
            bg="transparent"
            border="1px"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Flex>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
