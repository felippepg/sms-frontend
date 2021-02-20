import React, { useState, useEffect } from 'react';
import Navigation from '../menu/Navigation';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import Email from '@material-ui/icons/Email'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Alert from 'react-bootstrap/Alert';
import FlashMessage from 'react-flash-message';

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
    button: {
        width: 700

    }
}));

const EditUser = () => {    
    const classes = useStyles();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');
    
    let {id} = useParams();
    const idUser = parseFloat({id}.id)

    useEffect(() => {
        const fetch = async() => {
            const response = await api.post('/user', {id: idUser});
            setUser(response.data.nome);
            setEmail(response.data.email);
        }

         fetch()
    },[])

    const sendData = async (e) => {
        e.preventDefault();
        if(!user || !email) {
            return setWarning('Os campos acima não podem ser nulos')
        }
         
        try {
            const response = await api.put('/user/update', {
                id: idUser,
                name: user,
                email: email
            });
            if(response.data.situation === true) {
                setSuccess('Suas alterações foram salvas');
            }

        } catch (error) {
            console.log(error)
            setWarning(true)
        }
    }

    return(
<>  
            <Navigation/>
            <h1>Editar usuario</h1>
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
                            onChange={(e) => setUser(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit" value="Salvar" color="primary" startIcon={<SaveIcon />}>Salvar</Button>
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

export default EditUser

