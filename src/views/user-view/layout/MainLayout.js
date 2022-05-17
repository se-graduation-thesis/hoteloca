import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from "react-redux"
import logo from '../../../assets/images/logo.png'
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import NavBarHomePage from './navbar/NavBarHomePage';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import * as action_bill from "actions/bill.action"
import * as cus_actions from "actions/customer.action"
import * as actions from "actions/account.action"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export default function NavbarMainLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const account = useSelector((state) => state.account.userAuth);

    const customer = useSelector((state) => state.customer.customer);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [accountShow, setAccountShow] = React.useState(null)
    const listBillByStatus = useSelector((state) => state.bill.listBillByStatusAccept);
    const [bill_show, setBillShow] = React.useState([])
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const handleLogout = () => {
        actions.userlogout()
        localStorage.setItem("user_authenticated", "")
        location.reload();
    };

    React.useEffect(() => {
        dispatch(action_bill.fetchBillByStatusAccept())
    }, [])

    React.useEffect(() => {
        if (listBillByStatus) {
            let id = isJson(account) ? JSON.parse(account).user_id : account.user_id
            setBillShow(listBillByStatus.filter(({ khachHangid }) => khachHangid.id === id))

        }
    }, [listBillByStatus])
    React.useEffect(() => {
        if (account) {
            if (isJson(account)) {
                dispatch(cus_actions.getCustomerById(JSON.parse(account).user_id))
                setAccountShow(JSON.parse(account))
            } else {
                dispatch(cus_actions.getCustomerById(account.user_id))
                setAccountShow(account.user_id)
            }

        }
    }, account)
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100000 }}>
                <AppBar elevation={1} position="static" style={{ alignItems: "center", backgroundColor: 'white' }}>
                    <Toolbar style={{ backgroundColor: 'white', width: '70%' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <img src={logo} alt="logo" style={{ height: 40 }} />
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {
                            accountShow === null ? <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>Đăng nhập</Button> &nbsp;
                                <Button variant="contained" color="secondary" onClick={() => navigate("/register")}>Đăng kí</Button>
                            </Box> :
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate("/customer-info")}>
                                        <Avatar sx={{ width: 32, height: 32 }} src={customer?.hinhAnh}></Avatar>
                                        <span style={{ color: 'black', fontWeight: 'bold', marginRight: 30, marginLeft: 10 }}>{customer?.ho + " " + customer?.ten}</span>
                                    </div>
                                    <IconButton onClick={() => navigate("/list-bill")} aria-label="delete" style={{ color: "black" }}>
                                        <Badge badgeContent={bill_show.length} color="secondary">
                                            <CalendarMonthIcon />
                                        </Badge>
                                        <span style={{ fontSize: 12, marginLeft: 10 }}>ĐƠN ĐẶT CỦA TÔI</span>
                                    </IconButton>
                                    <IconButton aria-label="delete" style={{ color: "black" }} onClick={handleLogout}>
                                        <LogoutIcon />
                                        <span style={{ fontSize: 12, marginLeft: 10 }}>ĐĂNG XUẤT</span>
                                    </IconButton>
                                </Box>
                        }

                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                <div className='navbar' >
                    <NavBarHomePage />
                </div>
            </div>
            <div style={{ marginTop: 140 }}>
                <Outlet />
            </div>
        </Box>
    );
}
