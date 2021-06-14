import React from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import {naviClasses} from "../Styles/madeStyles";
interface LoginProps {
    user: string;
    password: string;
    classes: string
}

class navigator extends React.Component {
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default navigator