import React, { useState } from "react";
import { differenceInSeconds } from "date-fns";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { alpha } from '@mui/system';
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "./icons/HomeIcon";
import PendingRequestsIcon from "./icons/PendingRequestsIcon";
import TrustedUsersIcon from "./icons/TrustedUsersIcon";
import GroupsIcon from "./icons/GroupsIcon";
import SecurityReportIcon from "./icons/SecurityReportIcon";
import ActiveLinkSharesIcon from "./icons/ActiveLinkSharesIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import Badge from "@mui/material/Badge";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import TuneIcon from "@mui/icons-material/Tune";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ConfigLogo from "./config-logo";

import browserClient from "../services/browser-client";
import deviceService from "../services/device";
import {getStore} from "../services/store";
import DOMPurify from "dompurify";
import avatarService from "../services/avatar";
import offlineCache from "../services/offline-cache";
import action from "../actions/bound-action-creators";
import DialogGoOffline from "./dialogs/go-offline";
import DialogChangeAccount from "./dialogs/change-account";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        backgroundColor: theme.palette.blueBackground.main,
    },
    toolbar: {
        minHeight: deviceService.hasTitlebar() ? "82px" : "50px",
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.blueBackground.main,
        color: theme.palette.lightGreyText.main,
        boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
        paddingTop: theme.spacing(2),
    },
    logoWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(2, 2, 1, 2),
        minHeight: 64,
    },
    listItemRootActive: {
        "&:hover": {
            backgroundColor: theme.palette.lightBackground.main,
            color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
            backgroundColor: theme.palette.lightBackground.main,
            color: theme.palette.primary.main,
            "& .MuiListItemIcon-root": {
                color: theme.palette.primary.main,
            },
        },
    },
    listItemRoot: {
        "&:hover": {
            backgroundColor: theme.palette.lightBackground.main,
            color: theme.palette.primary.main,
            "& .MuiListItemIcon-root": {
                color: theme.palette.primary.main,
            },
        },
        "&.Mui-selected": {
            backgroundColor: theme.palette.lightBackground.main,
            color: theme.palette.primary.main,
            "& .MuiListItemIcon-root": {
                color: theme.palette.primary.main,
            },
        },
    },
    listItemText: {
        fontSize: "0.875rem",
        "& .MuiBadge-badge": {
            fontSize: "0.75rem",
            height: "15px",
            minWidth: "15px",
            color: theme.palette.lightBackground.main,
            backgroundColor: theme.palette.badgeBackground.main,
            right: "-8px",
        },
    },
    listItemIcon: {
        color: theme.palette.lightGreyText.main,
        minWidth: theme.spacing(4),
    },
    listItemIconSelected: {
        color: theme.palette.lightBackground.main,
        minWidth: theme.spacing(4),
    },
    icon: {
        fontSize: "18px",
    },
    subHeader: {
        color: theme.palette.lightGreyText.main,
        backgroundColor: 'transparent',
    },
    version: {
        color: alpha(theme.palette.greyText.main, 0.5),
        margin: "10px",
        position: "absolute",
        bottom: "0",
        fontSize: "14px",
    },
    userSection: {
        position: "absolute",
        bottom: "40px",
        left: "0",
        right: "0",
        padding: theme.spacing(2),
        borderTop: `1px solid ${alpha(theme.palette.greyText.main, 0.2)}`,
    },
    signedInText: {
        fontSize: "0.75rem",
        color: alpha(theme.palette.greyText.main, 0.7),
        marginBottom: theme.spacing(0.5),
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    userInfoRow: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1),
    },
    avatar: {
        width: 32,
        height: 32,
        marginRight: theme.spacing(1.5),
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        backgroundColor: '#999',
        marginRight: theme.spacing(1.5),
        color: 'white',
        fontSize: '16px',
    },
    userDetails: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
    },
    userName: {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: theme.palette.lightGreyText.main,
        lineHeight: 1.3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    userDomain: {
        fontSize: "0.75rem",
        color: alpha(theme.palette.greyText.main, 0.7),
        lineHeight: 1.3,
    },
    settingsButton: {
        marginTop: theme.spacing(1),
        textTransform: "none",
        justifyContent: "flex-start",
        padding: theme.spacing(0.75, 1.5),
        fontSize: "0.875rem",
        width: "100%",
        borderRadius: "8px",
    },
    overlayIcon: {
        position: 'absolute',
        width: '0.6em',
        height: '0.6em',
        bottom: 2,
        right: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '50%',
        color: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.background.paper}`,
    },
    overlayedIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#999',
        color: 'white',
        fontSize: '14px',
    },
}));

const Sidebar = (props) => {
    const { t } = useTranslation();
    const { mobileOpen, setMobileOpen } = props;
    const serverStatus = useSelector((state) => state.server.status);
    const offlineMode = useSelector((state) => state.client.offlineMode);
    const settingsDatastore = useSelector((state) => state.settingsDatastore);
    const recurrenceInterval = useSelector((state) => state.server.complianceCentralSecurityReportsRecurrenceInterval);
    const disableCentralSecurityReports = useSelector((state) => state.server.disableCentralSecurityReports);
    const classes = useStyles();
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const [moreLinks, setMoreLinks] = React.useState([]);
    const [version, setVersion] = React.useState("");
    const [profilePic, setProfilePic] = useState("");
    const [anchorTopMenuEl, setAnchorTopMenuEl] = React.useState(null);
    const [goOfflineOpen, setGoOfflineOpen] = React.useState(false);
    const [changeAccountOpen, setChangeAccountOpen] = React.useState(false);
    let location = useLocation();
    let isSubscribed = true;

    React.useEffect(() => {
        browserClient.getConfig().then(onNewConfigLoaded);

        browserClient.loadVersion().then(function (version) {
            setVersion(version);
        });
        
        loadAvatar();
        return () => (isSubscribed = false);
    }, []);

    const loadAvatar = async () => {
        setProfilePic((await avatarService.readAvatarCached()) || '')
    }

    const openTopMenu = (event) => {
        setAnchorTopMenuEl(event.currentTarget);
    };
    
    const closeTopMenu = () => {
        setAnchorTopMenuEl(null);
    };

    const openChangeAccount = (event) => {
        setChangeAccountOpen(true)
    };

    const goOffline = () => {
        setGoOfflineOpen(true);
    };
    
    const goOnline = () => {
        offlineCache.disable();
        offlineCache.clear();
    };
    
    const logout = async () => {
        window.location.href = 'logout-success.html';
    };

    const onNewConfigLoaded = (configJson) => {
        setMoreLinks(configJson.more_links);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isSelected = (regexMatch) => {
        return regexMatch.test(location.pathname);
    };

    let newSecurityReport = "NOT_REQUIRED";
    if (recurrenceInterval > 0 && !disableCentralSecurityReports) {
        if (
            serverStatus.hasOwnProperty("data") &&
            serverStatus.data.hasOwnProperty("last_security_report_created") &&
            serverStatus.data.last_security_report_created !== null
        ) {
            const lastSecurityReportAgeSeconds = differenceInSeconds(
                new Date(),
                new Date(serverStatus.data.last_security_report_created)
            );
            if (lastSecurityReportAgeSeconds > recurrenceInterval) {
                newSecurityReport = "REQUIRED";
            }
        } else {
            newSecurityReport = "REQUIRED";
        }
    }

    const drawer = (
        <div>
            {isSmUp && <div className={classes.logoWrap}>
                <ConfigLogo configKey={'logo'} defaultLogo={'img/jimberlogo.svg'} height="34px" />
            </div>}
            {!isSmUp && (
                <div style={{ padding: theme.spacing(2), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ConfigLogo configKey={'logo'} defaultLogo={'img/jimberlogo.svg'} height="34px" />
                    <IconButton onClick={handleDrawerToggle} edge="end">
                        <MenuIcon />
                    </IconButton>
                </div>
            )}
            <List>
                <ListSubheader className={classes.subHeader}>{t("NAVIGATION")}</ListSubheader>
                <ListItem
                    button
                    component={Link}
                    to="/"
                    classes={{ root: isSelected(/^\/$/) ? classes.listItemRootActive : classes.listItemRoot }}
                    selected={isSelected(/^\/$/)}
                >
                    <ListItemIcon
                        className={`${isSelected(/^\/$/) ? classes.listItemIconSelected : classes.listItemIcon}`}
                    >
                        <HomeIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.listItemText }} primary={t("HOME")} />
                </ListItem>
                {!offlineMode && (
                    <ListItem
                        button
                        component={Link}
                        to="/share/pendingshares"
                        classes={{
                            root: isSelected(/^\/share\/pendingshares$/)
                                ? classes.listItemRootActive
                                : classes.listItemRoot,
                        }}
                        selected={isSelected(/^\/share\/pendingshares$/)}
                    >
                        <ListItemIcon
                            className={`${
                                isSelected(/^\/share\/pendingshares$/)
                                    ? classes.listItemIconSelected
                                    : classes.listItemIcon
                            }`}
                        >
                            <PendingRequestsIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={
                                <Badge badgeContent={serverStatus.data ? serverStatus.data.unaccepted_shares_count : 0}>
                                    {t("PENDING_REQUESTS")}
                                </Badge>
                            }
                        />
                    </ListItem>
                )}
                {!offlineMode && (
                    <ListItem
                        button
                        component={Link}
                        to="/share/users"
                        classes={{
                            root: isSelected(/^\/share\/users$/) ? classes.listItemRootActive : classes.listItemRoot,
                        }}
                        selected={isSelected(/^\/share\/users$/)}
                    >
                        <ListItemIcon
                            className={`${
                                isSelected(/^\/share\/users$/) ? classes.listItemIconSelected : classes.listItemIcon
                            }`}
                        >
                            <TrustedUsersIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.listItemText }} primary={t("TRUSTED_USERS")} />
                    </ListItem>
                )}
                {!offlineMode && (
                    <ListItem
                        button
                        component={Link}
                        to="/groups"
                        classes={{ root: isSelected(/^\/groups$/) ? classes.listItemRootActive : classes.listItemRoot }}
                        selected={isSelected(/^\/groups$/)}
                    >
                        <ListItemIcon
                            className={`${
                                isSelected(/^\/groups$/) ? classes.listItemIconSelected : classes.listItemIcon
                            }`}
                        >
                            <GroupsIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={
                                <Badge badgeContent={serverStatus.data ? serverStatus.data.unaccepted_groups_count : 0}>
                                    {t("GROUPS")}
                                </Badge>
                            }
                        />
                    </ListItem>
                )}
                {!offlineMode && (
                    <ListItem
                        button
                        component={Link}
                        to="/security-report"
                        classes={{
                            root: isSelected(/^\/security-report$/) ? classes.listItemRootActive : classes.listItemRoot,
                        }}
                        selected={isSelected(/^\/security-report$/)}
                    >
                        <ListItemIcon
                            className={`${
                                isSelected(/^\/security-report$/) ? classes.listItemIconSelected : classes.listItemIcon
                            }`}
                        >
                            <SecurityReportIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary={
                                <Badge badgeContent={newSecurityReport === "REQUIRED" ? "!" : 0}>
                                    {t("SECURITY_REPORT")}
                                </Badge>
                            }
                        />
                    </ListItem>
                )}
                {!offlineMode && !getStore().getState().server.complianceDisableLinkShares && (
                    <ListItem
                        button
                        component={Link}
                        to="/active-link-shares"
                        classes={{
                            root: isSelected(/^\/active-link-shares/)
                                ? classes.listItemRootActive
                                : classes.listItemRoot,
                        }}
                        selected={isSelected(/^\/active-link-shares$/)}
                    >
                        <ListItemIcon
                            className={`${
                                isSelected(/^\/active-link-shares$/)
                                    ? classes.listItemIconSelected
                                    : classes.listItemIcon
                            }`}
                        >
                            <ActiveLinkSharesIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.listItemText }} primary={t("ACTIVE_LINK_SHARES")} />
                    </ListItem>
                )}
            </List>
            {/* User section - Signed in as */}
            <div className={classes.userSection}>
                <Typography className={classes.signedInText}>
                    {t("SIGNED_IN_AS")}
                </Typography>
                <div 
                    className={classes.userInfoRow} 
                    onClick={openChangeAccount}
                    style={{ cursor: 'pointer' }}
                >
                    {profilePic ? (
                        <Avatar alt="Profile Picture" src={profilePic} className={classes.avatar} />
                    ) : (
                        <Avatar className={classes.avatarPlaceholder}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </Avatar>
                    )}
                    <div className={classes.userDetails}>
                        <Typography className={classes.userName}>
                            {getStore().getState().user.username}
                        </Typography>
                        <Typography className={classes.userDomain}>
                            jimber.io
                        </Typography>
                    </div>
                </div>
                <Button
                    aria-controls="sidebar-user-menu"
                    aria-haspopup="true"
                    onClick={openTopMenu}
                    className={classes.settingsButton}
                    startIcon={<SettingsIcon />}
                    endIcon={<ExpandMoreIcon />}
                >
                    {t("SETTINGS")}
                </Button>
                <Menu
                    id="sidebar-user-menu"
                    anchorEl={anchorTopMenuEl}
                    keepMounted
                    open={Boolean(anchorTopMenuEl)}
                    onClose={closeTopMenu}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    {!offlineCache.isActive() && (
                        <MenuItem component={Link} to="/account/server-info" onClick={closeTopMenu}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <TuneIcon className={classes.icon} />
                            </ListItemIcon>
                            <Typography variant="body2">{t("ACCOUNT")}</Typography>
                        </MenuItem>
                    )}
                    {!offlineCache.isActive() && (
                        <MenuItem component={Link} to="/settings/password-generator" onClick={closeTopMenu}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <SettingsIcon className={classes.icon} />
                            </ListItemIcon>
                            <Typography variant="body2">{t("SETTINGS")}</Typography>
                        </MenuItem>
                    )}
                    {!offlineCache.isActive() && (
                        <MenuItem component={Link} to="/other/sessions" onClick={closeTopMenu}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <AccountTreeIcon className={classes.icon} />
                            </ListItemIcon>
                            <Typography variant="body2">{t("OTHER")}</Typography>
                        </MenuItem>
                    )}
                    {!offlineCache.isActive() && !getStore().getState().server.complianceDisableOfflineMode && (
                        <MenuItem onClick={goOffline}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <AirplanemodeActiveIcon className={classes.icon} />
                            </ListItemIcon>
                            <Typography variant="body2">{t("GO_OFFLINE")}</Typography>
                        </MenuItem>
                    )}
                    {offlineCache.isActive() && !getStore().getState().server.complianceDisableOfflineMode && (
                        <MenuItem onClick={goOnline}>
                            <ListItemIcon className={classes.listItemIcon}>
                                <AirplanemodeActiveIcon className={classes.icon} />
                            </ListItemIcon>
                            <Typography variant="body2">{t("GO_ONLINE")}</Typography>
                        </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={logout}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <ExitToAppIcon className={classes.icon} />
                        </ListItemIcon>
                        <Typography variant="body2">{t("LOGOUT")}</Typography>
                    </MenuItem>
                </Menu>
            </div>
            {goOfflineOpen && <DialogGoOffline open={goOfflineOpen} onClose={() => setGoOfflineOpen(false)} />}
            {changeAccountOpen && <DialogChangeAccount open={changeAccountOpen} onClose={() => setChangeAccountOpen(false)} />}
            <div className={classes.version}>Jimber: {version}</div>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {isSmUp ? (
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            )}
        </nav>
    );
};

Sidebar.propTypes = {
    mobileOpen: PropTypes.bool.isRequired,
    setMobileOpen: PropTypes.func.isRequired,
};

export default Sidebar;
