import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import SignInSide from './pages/SignInSide';
import { Home } from './pages/home';

import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#2C4045',
      paper: '#2C4045',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#F3B013',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" exact element={<SignInSide />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
