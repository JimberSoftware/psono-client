import * as React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import MuiAlert from '@mui/material/Alert'
import { useTranslation } from "react-i18next";

const GridContainerErrors = (props) => {
    const { errors, setErrors, severity, ...rest } = props;
    const { t } = useTranslation();

    // Helper to convert any error value to a displayable string
    const errorToString = (error) => {
        if (typeof error === 'string') {
            return error;
        }
        if (error && typeof error === 'object') {
            if (error.message) return error.message;
            if (error.detail) return error.detail;
            if (error.error) return typeof error.error === 'string' ? error.error : 'UNKNOWN_ERROR';
            if (error.non_field_errors && Array.isArray(error.non_field_errors)) {
                return error.non_field_errors.join(', ');
            }
            // Try to stringify if it's a simple object
            try {
                const str = JSON.stringify(error);
                if (str !== '{}') return str;
            } catch (e) {
                // ignore
            }
            return 'UNKNOWN_ERROR';
        }
        return String(error);
    };

    // Ensure errors is an array of strings
    let errorArray = [];
    if (Array.isArray(errors)) {
        errorArray = errors.map(errorToString);
    } else if (errors && typeof errors === 'object') {
        // If errors is an object, try to extract error messages
        if (errors.errors && Array.isArray(errors.errors)) {
            errorArray = errors.errors.map(errorToString);
        } else if (errors.message) {
            errorArray = [errors.message];
        } else if (errors.detail) {
            errorArray = [errors.detail];
        } else if (errors.non_field_errors && Array.isArray(errors.non_field_errors)) {
            errorArray = errors.non_field_errors.map(errorToString);
        } else {
            errorArray = [errorToString(errors)];
        }
    } else if (typeof errors === 'string') {
        errorArray = [errors];
    }

    return (
        <Grid container {...rest}>
            {errorArray.length > 0 && (
                <Grid item xs={12} sm={12} md={12}>
                    <>
                        {errorArray.map((error, index) => {
                            return (
                                <MuiAlert
                                    onClose={() => {
                                        setErrors([]);
                                    }}
                                    key={index}
                                    severity={severity}
                                    style={{ marginBottom: "5px" }}
                                >
                                    {t(error)}
                                </MuiAlert>
                            );
                        })}
                    </>
                </Grid>
            )}
        </Grid>
    );
};

GridContainerErrors.defaultProps = {
    severity: "error",
};

GridContainerErrors.propTypes = {
    errors: PropTypes.array.isRequired,
    setErrors: PropTypes.func.isRequired,
    severity: PropTypes.string,
};

export default GridContainerErrors;
