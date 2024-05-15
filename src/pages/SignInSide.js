import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Google from '@mui/icons-material/Google';
import Microsoft from '@mui/icons-material/Microsoft';
import "./auth.css";
import { auth, analytics, db, googleAuthProvider, microsoftAuthProvider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { doc, setDoc } from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://enjoyyourmine.com/">
        enjoyyourmine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme
const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithProvider(googleAuthProvider);
  };

  const signInWithMicrosoft = () => {
    signInWithProvider(microsoftAuthProvider);
  };

  const signInWithProvider = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    if (result?.user) {
      onSuccessfulSignIn(result.user);
    } else {
      console.error("Sign In Failed");
    }
  };

  const onSuccessfulSignIn = async (user) => {
    logEvent(analytics, 'login', { uid: user.uid, providerId: user.providerData[0].providerId })
    await setDoc(doc(db, "users", user.uid), {
      displayName: user.displayName,
      email: user.email ?? user.providerData[0].email,
      photoURL: user.photoURL ?? user.providerData[0].photoURL,
    });
    const authInfo = {
      userID: user.uid,
      name: user.displayName,
      profilePhoto: user.photoURL,
      isAuth: true,
    };
    navigate("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("https://enjoyyourmine.com/wp-content/uploads/2023/10/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9uaV9yTS9NQUZzN2duaV9yTS8xL3AuanBn-2.png")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button onClick={signInWithGoogle}
              variant="outlined"
              startIcon={<Google />}
              fullWidth
              sx={{ mt: 3 }}
            >
              Continue with Google
            </Button>
            <Button onClick={signInWithMicrosoft}
              variant="outlined"
              startIcon={<Microsoft />}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Continue with Microsoft
            </Button>
            <Typography component="h1" variant="h5">
              - OR -
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
