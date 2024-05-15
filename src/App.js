import './App.css';
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import { Home } from './pages/home';
import { AppAdmin } from './pages/admin/admin';
import { db } from "./config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#2C4045',
      paper: '#2C4045',
    },
    primary: {
      main: '#E84710',
    },

    text: {
      primary: '#FFFFFF',
      secondary: '#F3B013',
    },
  },
});

const dataLoader = async () => {
  try {
    const workshops = [];
    const querySnapshot = await getDocs(collection(db, "workshops"));
    querySnapshot.forEach((doc) => {
      workshops.push({ id: doc.id, ...doc.data() });
    });
    return workshops;
  } catch (error) {
    console.error("Error getting workshops: ", error);
    return redirect("/login" + window.location.search);
  }
};

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home />, loader: dataLoader },
    { path: "/login", element: <SignInSide /> },
    { path: "/admin/*", element: <AppAdmin /> },
  ]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
