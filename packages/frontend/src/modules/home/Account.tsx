import { ApolloError, useApolloClient, useMutation } from '@apollo/client';
import {
  Button as MuiButton,
  styled,
  Typography,
  Stack,
  Input,
  Box,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Account as AccountType } from '~/graphql/gen/graphql';
import { UPDATE_BALANCE } from '~/graphql/mutations/accounts';
import { GET_ACCOUNT_DETAILS } from '~/graphql/queries/accounts';

interface Props {
  loggedInToken: string | null;
  account: { id: string; accountType: string; owner: string };
}

const Account = ({ account, loggedInToken }: Props) => {
  const [accountDetails, setAccountDetails] = useState<AccountType | null>(
    null,
  );
  const [updateAmount, setUpdateAmount] = useState<number | null>(null);
  const [isEditing, setIssEditing] = useState(false);
  const apolloClient = useApolloClient();

  const [updateBalance] = useMutation(UPDATE_BALANCE, {
    context: {
      headers: {
        authorization: `Bearer ${loggedInToken}`,
      },
    },
  });

  const handleError = (error: unknown) => {
    if (error instanceof ApolloError) {
      alert(error.message);
    }
  };

  const getAccountData = async () => {
    try {
      const { data, error } = await apolloClient.query({
        fetchPolicy: 'network-only',
        query: GET_ACCOUNT_DETAILS,
        variables: {
          accountId: account.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${loggedInToken}`,
          },
        },
      });
      if (error) {
        throw error;
      }
      if (data.accountDetails) {
        setAccountDetails(data.accountDetails);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSave = useCallback(async () => {
    try {
      if (!updateAmount) {
        throw new Error('Please enter an amount');
      }
      const result = await updateBalance({
        variables: {
          accountId: account.id,
          amountMinorUnits: updateAmount,
        },
      });
      if (result.data?.updateBalance?.success && accountDetails) {
        setAccountDetails({
          ...accountDetails,
          balanceMinorUnits: updateAmount,
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setUpdateAmount(null);
      setIssEditing(false);
    }
  }, [updateAmount, account.id, accountDetails, updateBalance]);

  const balance = accountDetails?.balanceMinorUnits
    ? `$${(accountDetails?.balanceMinorUnits / 100).toFixed(2)}`
    : '-';

  useEffect(() => {
    setAccountDetails(null);
  }, [loggedInToken]);
  return (
    <Container>
      <Typography>{`${account.owner}'s ${account.accountType}`}</Typography>
      <AccountCopy>Account Type: {account?.accountType}</AccountCopy>
      <Box>
        {isEditing && accountDetails?.balanceMinorUnits ? (
          <Box>
            <AccountCopy>Balance: </AccountCopy>
            <Input
              defaultValue={(accountDetails?.balanceMinorUnits / 100).toFixed(
                2,
              )}
              onChange={(e) => setUpdateAmount(Number(e.target.value) * 100)}
            />
          </Box>
        ) : (
          <AccountCopy>Balance: {balance}</AccountCopy>
        )}
      </Box>
      <AccountCopy>
        Last Four:{' '}
        {accountDetails?.id.substring(accountDetails.id.length - 4) ?? '-'}
      </AccountCopy>

      <Button variant="text" onClick={getAccountData}>
        Get Details
      </Button>
      {isEditing ? (
        <Button variant="text" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button
          disabled={!accountDetails}
          variant="text"
          onClick={() => setIssEditing(true)}
        >
          Edit Balance
        </Button>
      )}
    </Container>
  );
};

export default Account;

const Container = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-evenly',
  alignItems: 'flex-start',
  marginBottom: '80px',
  padding: theme.spacing(2),
  width: '200px',
  height: '200px',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
}));

const AccountCopy = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
}));

const Button = styled(MuiButton)<{ isActive?: boolean }>(({ theme }) => ({
  marginX: theme.spacing(1),
  padding: 0,
  textTransform: 'none',
  justifyContent: 'flex-start',
}));
