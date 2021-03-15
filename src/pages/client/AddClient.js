import React, { useState } from 'react';
import Navigation from '../menu/Navigation';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import MaskedInput from 'react-text-mask';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Email from '@material-ui/icons/Email'
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Alert from 'react-bootstrap/Alert';
import api from '../../services/api';
import FlashMessage from 'react-flash-message';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['+', /\d/, /\d/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const AddClient = () => {
    const classes = useStyles();
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');

    const sendData = async (e) => {
        e.preventDefault();

        const data = {
            name: user,
            email: email,
            phone: phone,
        }

        if (!user || !email || !phone) {
            setWarning('Preencha os campos corretamente')
        } else {
            try {
                await api.post('/client/register', data);
                setSuccess('Usuario criado com sucesso');
                setUser('');
                setEmail('');
                setPhone('');
                setWarning('');

            } catch (error) {
                throw new Error(error)
            }
        }
    }

    return (
        <>
            <Navigation />
            <h1>Adicionar Clientes</h1>
            <div>
                <Form onSubmit={sendData} >
                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <AccountCircle />
                        </Grid>
                        <TextField
                            id="input-with-icon-grid"
                            label="Insira o seu nome"
                            value={user}
                            onChange={(e) => { setUser(e.target.value) }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <Email />
                        </Grid>
                        <TextField
                            id="input-with-icon-grid"
                            label="Insira o seu email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <PhoneIcon />
                        </Grid>
                        <Input
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl>

                    <Button type="submit" value="Cadastrar" color="primary" startIcon={<SaveIcon />}>Cadastrar</Button>
                </Form>
                {warning !== '' &&
                    <FlashMessage duration={5000}>
                        <Alert variant="danger">{warning}</Alert>
                    </FlashMessage>
                }

                {success !== '' &&
                    <FlashMessage duration={5000}>
                        <Alert variant="success">{success}</Alert>
                    </FlashMessage>
                }
            </div>
        </>
    )
}

export default AddClient
