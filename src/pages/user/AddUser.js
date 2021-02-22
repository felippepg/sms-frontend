import React, { useState } from 'react';
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
import SaveIcon from '@material-ui/icons/Save';
import PasswordIcon from '@material-ui/icons/PanoramaFishEye';
import Alert from 'react-bootstrap/Alert';
import api from '../../services/api';
import FlashMessage from 'react-flash-message';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

const User = () => {
    const classes = useStyles();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');

    const sendData = async (e) => {
        e.preventDefault();
        console.log(warning)

        const data = {
            name: user,
            email: email,
            password: password,
        }
        
        if(!user || !email || !password) {
            setWarning('Preencha os campos corretamente')

        } else {
            try {
                await api.post('/user/register', data);
                setSuccess('Usuario criado com sucesso');
                setUser('');
                setEmail('');
                setPassword('');
                setWarning('');

            } catch (error) {
                throw new Error(error)
            }
        }
    };

    return(
        <>  
            <Navigation/>
            <h1>Cadastro de Usuario</h1>
            <div>
                <Form onSubmit={ sendData }>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <AccountCircle />
                        </Grid>
                        <TextField 
                            id="input-with-icon-grid"
                            label="Insira o seu nome" 
                            value={user}
                            onChange= {(e) => {setUser(e.target.value)}}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid>
                            <Email />
                        </Grid>
                        <TextField 
                            id="input-with-icon-grid" 
                            label="Insira o seu email" 
                            value= {email}
                            onChange= {(e) => {setEmail(e.target.value)}}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <Grid >
                            <PasswordIcon />
                        </Grid>
                        <Input 
                            type="password" 
                            placeholder="Digite a sua senha"
                            value= {password}
                            onChange= {(e) => {setPassword(e.target.value)}}
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

export default User
