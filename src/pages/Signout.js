import { Redirect } from "react-router-dom";
import Signin from "./Signin";

import {TOKEN_KEY} from '../services/auth';

const Signout = () => {
    localStorage.removeItem(TOKEN_KEY)
    return (
        <></>
    )
} 

export default Signout