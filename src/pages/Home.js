import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './menu/Navigation';

const useStyles = makeStyles({
    root: {
      width: 25,
    },
});

const Home = () => {
    const classes = useStyles();

    return(
        <>
            <Navigation/>
            <h1 className={classes}>Bem vindo(a)</h1>
        </>
    )
}

export default Home