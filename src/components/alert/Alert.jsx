import { useEffect } from "react";
import PropTypes from "prop-types";
import { Alert as AlertUI, Collapse, IconButton } from "@mui/material";
import "./alert.scss";

import CloseIcon from "@mui/icons-material/Close";

const Alert = (props) => {
    const { openAlert, setOpenAlert, message } = props;

    useEffect(() => {
        if (openAlert) {
            setTimeout(() => {
                setOpenAlert(false);
            }, 3000);
        }
    }, [openAlert] );

    return (
        <Collapse
            className="alert"
            in={openAlert}>
            <AlertUI
                severity="success"
                action={
                    <IconButton
                        size="small"
                        onClick={() => setOpenAlert(false)}>
                        <CloseIcon/>
                    </IconButton>
                }>
                <span className="alert__message">{message}</span>
            </AlertUI>
        </Collapse>
    );
};

Alert.propTypes = {
    openAlert: PropTypes.bool.isRequired,
    setOpenAlert: PropTypes.func.isRequired,
    message: PropTypes.string,
};

Alert.defaultProps = {
    message: "El formulario se procesó correctamente",
};

export default Alert;