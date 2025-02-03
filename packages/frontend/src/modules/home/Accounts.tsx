import { styled, Box } from '@mui/material';
import { accounts } from '~/shared/constants';
import Account from './Account';

interface Props {
  loggedInToken: string | null;
}

const Accounts = ({ loggedInToken }: Props) => {
  return (
    <Container>
      {accounts.map((account) => (
        <Account
          key={account.id}
          loggedInToken={loggedInToken}
          account={account}
        />
      ))}
    </Container>
  );
};

export default Accounts;

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '80px',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
}));
