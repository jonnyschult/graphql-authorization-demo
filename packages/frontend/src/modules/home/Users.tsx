import {
  Stack,
  Button as MuiButton,
  styled,
  Typography,
  Box,
} from '@mui/material';
import { USERS } from '~/shared/constants';

interface Props {
  loggedInToken: string | null;
  setLoggedInToken: (loggedInToken: string) => void;
}

const Users = ({ loggedInToken, setLoggedInToken }: Props) => {
  return (
    <Container>
      <Typography fontSize={24} variant="h3" textAlign={'center'}>
        Select Which User is Logged In
      </Typography>

      <Stack display={'flex'} alignItems={'center'} mb={2} width={'100%'}>
        <Typography variant="h5" fontSize={20}>
          Supervisors
        </Typography>
        <Box>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.JaneDoe.token}
            onClick={() => setLoggedInToken(USERS.JaneDoe.token)}
          >
            Jane Doe
          </Button>
        </Box>
      </Stack>
      <Stack display={'flex'} alignItems={'center'} mb={2} width={'100%'}>
        <Typography variant="h5" fontSize={20}>
          Agents
        </Typography>
        <Box>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.JohnDough.token}
            onClick={() => setLoggedInToken(USERS.JohnDough.token)}
          >
            John Dough
          </Button>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.GeorgeKing.token}
            onClick={() => setLoggedInToken(USERS.GeorgeKing.token)}
          >
            George King
          </Button>
        </Box>
      </Stack>
      <Stack display={'flex'} alignItems={'center'} mb={2} width={'100%'}>
        <Typography variant="h5" fontSize={20}>
          Customers
        </Typography>
        <Box>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.PamWozniak.token}
            onClick={() => setLoggedInToken(USERS.PamWozniak.token)}
          >
            Pam Wozniak
          </Button>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.BarbaraBarbar.token}
            onClick={() => setLoggedInToken(USERS.BarbaraBarbar.token)}
          >
            Barbara Barbar
          </Button>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.MikeWozniak.token}
            onClick={() => setLoggedInToken(USERS.MikeWozniak.token)}
          >
            Mike Wozniak
          </Button>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.BenPartridge.token}
            onClick={() => setLoggedInToken(USERS.BenPartridge.token)}
          >
            Ben Partridge
          </Button>
          <Button
            variant="outlined"
            isActive={loggedInToken === USERS.HenryPaker.token}
            onClick={() => setLoggedInToken(USERS.HenryPaker.token)}
          >
            Henry Paker
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Users;

const Container = styled(Stack)(({ theme }) => ({
  width: '100%',
  marginBottom: '20px',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
}));

const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
  color: isActive
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },
}));
