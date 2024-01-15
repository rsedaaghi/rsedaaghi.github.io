//
import {Container } from '@mui/material';
import ResponsiveAppBar from './components/appbar';
//
// ==============================================================

function App() {
  return (
    <main className="App">
      <Container fixed>
        <ResponsiveAppBar />
        <Header />
      </Container>
    </main>
  );
}

export default App;
