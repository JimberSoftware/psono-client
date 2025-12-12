import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";

export default createSvgIcon(
    <React.Fragment>
        <defs>
            <clipPath id="clip0_trusted_users">
                <rect width="18" height="21" fill="white" transform="translate(3 1.5)"/>
            </clipPath>
        </defs>
        <g clipPath="url(#clip0_trusted_users)">
            <path d="M15.9 5.99995C15.9 8.09995 14.2 9.79995 12.2 9.79995C10.2 9.79995 8.40002 8.09995 8.40002 5.99995C8.40002 3.89995 10.1 2.19995 12.2 2.19995C14.3 2.19995 15.9 3.89995 15.9 5.99995Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M4.59998 20.1C4.69998 16 7.99998 12.7 12.1 12.7C16.2 12.7 19.5 16 19.6 20.1C17.3 21.1 14.8 21.7 12.1 21.7C9.49998 21.7 6.89998 21.2 4.59998 20.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
    </React.Fragment>,
    "TrustedUsers"
);
