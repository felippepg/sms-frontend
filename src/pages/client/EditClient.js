import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';

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
        mask={['+',/\d/, /\d/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/,  '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const EditClient = () => {
    const classes = useStyles();
    const [phone, setPhone]     = useState('');
    const [client, setClient]   = useState('');
    const [email, setEmail]     = useState('');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');

    let {id} = useParams()

    const sendData = async (e) => {
        e.preventDefault()

        try {
            if(!client || !email || !phone) {
                return setWarning('Os campos acima não podem ser nulos');
            } 
            const response  = await api.put('/client/update', {
                name: client, 
                email: email, 
                phone: phone,
                id: {id}.id
            });

            setSuccess(response.data);

        } catch (error) {
            setWarning('Erro: ' + error);
        }        
    }

    useEffect(() => {
        const idClient = parseFloat({id}.id);
        const fetch = async () => {
            const response = await api.post('/client', { id: idClient});
            setClient(response.data.nome);
            setEmail(response.data.email);
            setPhone(response.data.telefone);
        }

        fetch();
    },[]);

    return(
        <>
            <Navigation />
            <h1>Editando Cliente</h1>
            <div>
                <Form onSubmit={ sendData} >
                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <AccountCircle />
                        </Grid>
                        <TextField 
                            id="input-with-icon-grid"
                            label="Insira o seu nome" 
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <PhoneIcon />
                        </Grid> 
                        <Input
                            value={phone}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FormControl>
                    
                    <Button type="submit" value="Cadastrar" color="primary" startIcon={<SaveIcon />}>Cadastrar</Button>
                </Form>
                {warning !== '' &&
                    <FlashMessage duration={5000}>
                        <Alert variant="danger">{warning}</Alert>
                    </FlashMessage>
                }

                {success  !== '' &&
                    <FlashMessage duration={5000}>
                        <Alert variant="success">{success}</Alert>
                    </FlashMessage>
                }
            </div>
        </>
    )
}

export default EditClient
