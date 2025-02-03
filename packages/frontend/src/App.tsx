import { Stack, styled } from '@mui/material';
import Home from './modules/home/Home';

const App = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default App;

const Container = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100vh',
  width: '100vw',
  background: theme.palette.background.default,
}));
