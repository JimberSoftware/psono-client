import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@mui/styles';
import Sidebar from "./sidebar";
import deviceService from "../services/device";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    fullContent: {
        flexGrow: 1,
    },
    content: {
        height: "100%",
        width: "100%",
        overflow: "auto",
        backgroundColor: theme.palette.baseBackground.main,
        position: "absolute",
        paddingBottom: "30px",
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
    },
}));

const Base = (props) => {
    const classes = useStyles();
    const { children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <Sidebar {...props} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className={classes.fullContent}>
                <div className={classes.content}>{children}</div>
            </div>
        </div>
    );
};

Base.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Base;
