import React from 'react';
import Navigation from '../menu/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Email from '@material-ui/icons/Email'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Form } from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import SaveIcon from '@material-ui/icons/Save';
import PasswordIcon from '@material-ui/icons/PanoramaFishEye'
import PhoneIcon from '@material-ui/icons/Phone'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        margin: theme.spacing(1),
        width: 539
    },
    root_: {
        margin: theme.spacing(1),
        width: 539,
        paddingRight: 0
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['+',/\d/, /\d/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

const sendData = () => {
    alert("Foi")
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const User = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        textmask: '(1  )    -    ',
        numberformat: '1320',
    });

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value,
        });
    };

    return(
        <>  
            <Navigation/>
            <h1>Cadastro de Usuario</h1>
            <div>
                <Form onSubmit={ sendData }>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Insira o seu nome" />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid item>
                            <Email />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Insira o seu email" />
                    </FormControl>
                    <FormControl fullWidth className={classes.root}>
                        <Grid item>
                            <PasswordIcon />
                        </Grid>
                        <Input type="password" placeholder="Digite a sua senha"/>
                    </FormControl>
                    <FormControl fullWidth className={classes.root_}>
                        <Grid item>
                            <PhoneIcon />
                        </Grid> 
                        <Input
                            onChange={handleChange}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl>
                    
                    <Button type="submit" value="Cadastrar" color="primary" startIcon={<SaveIcon />}>Cadastrar</Button>
                </Form>
            </div>
        </>
    )
}

export default User
