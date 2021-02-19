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

/*
    let {id} = useParams();
    const idUser = parseFloat({id}.id)

    useEffect(() => {
        const fetch = async() => {
            const response = await api.post('/user', {id: idUser})

        }
    },[])

    return(
        <>
            <Navigation />
            <h1>ID: {id}</h1>
        </>
    )




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
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import SaveIcon from '@material-ui/icons/Save';
import PasswordIcon from '@material-ui/icons/PanoramaFishEye';
import PhoneIcon from '@material-ui/icons/Phone';
import Alert from 'react-bootstrap/Alert';
import api from '../../services/api';
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

const User = () => {
    const classes = useStyles();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');

    const sendData = async (e) => {
        e.preventDefault();

        const data = {
            name: user,
            email: email,
            password: password,
            phone: phone
        }
        
        if(!user || !email || !password || !phone) {
            setWarning('Preencha os campos corretamente')
        } else {
            try {
                await api.post('/user/register', data);
                setSuccess('Usuario criado com sucesso');
                setUser('');
                setEmail('');
                setPassword('');
                setPhone('');
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
                    <FormControl fullWidth className={classes.root}>
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
                    <FormControl fullWidth className={classes.root_}>
                        <Grid>
                            <PhoneIcon />
                        </Grid> 
                        <Input
                            onChange={(e) => {setPhone(e.target.value)}}
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

*/