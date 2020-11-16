import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser, deleteUser, deleteAccount } from "../../actions/auth";
import { Box, Heading, Button, Text } from "@chakra-ui/react";

const VARIANT_COLOR = "teal";

const Dashboard = ({
  loadUser,
  auth: { user, loading },
  deleteUser,
  deleteAccount
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return loading || user === null ? (
    <Heading mt={4}>Loading ...</Heading>
  ) : user.userType === "user" ? (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Heading display="flex">Hello {user.user.username}</Heading>
      <Button
        variantColor={VARIANT_COLOR}
        mr={4}
        mt={4}
        onClick={() => deleteAccount(user.user.id)}
      >
        Delete Account
      </Button>
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        borderTop="1px"
        borderBottom="1px"
        borderColor="gray.200"
        justifyContent="space-between"
        m={4}
      >
        <Box display="flex" width="16.66%">
          <Text color="gray.600">Username </Text>
        </Box>
        <Box display="flex" width="16.66%">
          <Text color="gray.600">FirstName </Text>
        </Box>
        <Box display="flex" width="16.66%">
          <Text color="gray.600">LastName </Text>
        </Box>
        <Box display="flex" width="16.66%">
          <Text color="gray.600">Email </Text>
        </Box>
        <Box display="flex" width="16.66%">
          <Text color="gray.600">User Type </Text>
        </Box>
        <Box display="flex" width="16.66%">
          <Text color="gray.600">Delete </Text>
        </Box>
      </Box>
      {user.allUsers.map((user) => (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          borderBottom="1px"
          borderColor="gray.200"
          justifyContent="space-between"
          m={4}
        >
          <Box display="flex" width="16.66%">
            <Text color="gray.600">{user.username} </Text>
          </Box>
          <Box display="flex" width="16.66%">
            <Text color="gray.600">{user.firstname} </Text>
          </Box>
          <Box display="flex" width="16.66%">
            <Text color="gray.600">{user.lastname} </Text>
          </Box>
          <Box display="flex" width="16.66%">
            <Text color="gray.600">{user.email} </Text>
          </Box>
          <Box display="flex" width="16.66%">
            <Text color="gray.600">{user.usertype} </Text>
          </Box>
          <Box display="flex" width="16.66%">
            <Button
              variantColor={VARIANT_COLOR}
              onClick={() => deleteUser(user.id)}
              display={user.userType === "admin"}
              mb={4}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser,
  deleteUser,
  deleteAccount
})(Dashboard);
