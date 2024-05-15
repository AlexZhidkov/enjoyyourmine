import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function HomeAppBar() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = async () => {
        handleCloseUserMenu();
        await auth.signOut();
        console.log('User signed out');
        window.location.href = 'https://enjoyyourmine.com';
    };

    React.useEffect(() => {
        const getUser = async () => {
            const user = await auth.currentUser;
            if (!user) {
                navigate("/login");
            }
            setUser(user);
        }
        getUser();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                        onClick={() => window.location.href = 'https://enjoyyourmine.com'}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Enjoy Your Mine App
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user?.displayName} src={user?.photoURL} />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Profile' onClick={handleCloseUserMenu}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </MenuItem>
                            <MenuItem key='Logout' onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
