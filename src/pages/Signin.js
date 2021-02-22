import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from 'react-bootstrap/Alert'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import api from '../services/api';
import { TOKEN_KEY } from '../services/auth' ;
import FlashMessage from 'react-flash-message';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorInput, setErrorInput] = useState('')
  const [redirect, setRedirect] = useState('')
  
  const sendData = async (e) => {
    e.preventDefault()
    setErrorInput('')
    const data = {
        nome: username,
        senha: password
    }

    if(!username || !password) {
        return setErrorInput('Preencha os campos corretamente')
    }
    const response = await api.post('/user/login', data)

    if(response.data.auth === true) {
        console.log('Deu certo')
        localStorage.setItem(TOKEN_KEY, response.data.token)
        setRedirect('/app')
    } else {
        setErrorInput(response.data.erro)
    }
}

    if(redirect === '/app') {
        return <Redirect to="/home"/>
    }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} onSubmit={ sendData} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome do usuário"
            name="name"
            autoComplete="Nome usuário" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      {errorInput !== '' &&
        <FlashMessage duration={5000}>
          <Alert variant="danger">{errorInput}</Alert>
        </FlashMessage>
      }
    </Container>
  );
}

export default Signin

