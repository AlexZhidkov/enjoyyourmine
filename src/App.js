import './App.css';
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import { Home } from './pages/home';
import { AppAdmin } from './pages/admin/admin';
import { db, auth } from "./config/firebase-config";
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
    const availableWorkshops = [];
    (await getDocs(collection(db, "workshops"))).forEach((doc) => {
      availableWorkshops.push({ id: doc.id, ...doc.data() });
    });
    const selectedWorkshops = [];
    (await getDocs(collection(db, "users", auth.currentUser.uid, "workshops"))).forEach((doc) => {
      selectedWorkshops.push({ id: doc.id, ...doc.data() });
      const index = availableWorkshops.findIndex(workshop => workshop.id === doc.id);
      if (index >= 0) {
        availableWorkshops[index].isSelected = true;
      }
    });
    return { availableWorkshops, selectedWorkshops };
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
