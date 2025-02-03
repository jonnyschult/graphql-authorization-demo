import { Box } from '@mui/material';
import Users from './Users';
import { useState } from 'react';
import Accounts from './Accounts';
import { USERS } from '~/shared/constants';

const Home = () => {
  const [loggedInToken, setLoggedInToken] = useState<string>(
    USERS.JaneDoe.token,
  );
  return (
    <Box padding="16px" width={'100%'}>
      <Users
        loggedInToken={loggedInToken}
        setLoggedInToken={setLoggedInToken}
      />
      <Accounts loggedInToken={loggedInToken} />
    </Box>
  );
};

export default Home;
