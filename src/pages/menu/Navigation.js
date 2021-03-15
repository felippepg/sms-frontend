import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SendMessage from '@material-ui/icons/Send';
import User from '@material-ui/icons/Person'
import { Link } from 'react-router-dom';
import AddUser from '@material-ui/icons/PersonAdd';
import AddClient from '@material-ui/icons/AddCircle';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/auth';
import Logout from '@material-ui/icons/ExitToApp';
import ListClient from '@material-ui/icons/AccountCircle';
import { Message } from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    width: 1000,
  },
});


export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [redirect, setRedirect] = useState(false)

  const handleLogout = () => {
    logout()
    setRedirect(true)
  }

  if(redirect === true ) {
    return <Redirect to="/" />
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={ Link }
        to="/add-user"
        label="Adicionar Usuário"
        value="add-user"
        icon={<AddUser />} 
      />
      <BottomNavigationAction 
        component = { Link }
        to="/send-sms"
        label="Enviar SMS"
        value="send-sms"
        icon={<SendMessage />} 
      />
      <BottomNavigationAction
        component= { Link } 
        to="/list-user"
        label="Listar Usuários"
        value="edit-user"
        icon={<User />} 
      /> 

      <BottomNavigationAction
        component= { Link }
        to="/add-client"
        label="Cadastrar cliente"
        value="add-client"
        icon={<AddClient />} 
      /> 
      
      <BottomNavigationAction
        component= { Link }
        to="/list-client"
        label="Listar cliente"
        value="list-client"
        icon={<ListClient />} 
      /> 
      <BottomNavigationAction 
        component={ Link }
        to="/list-sms"
        label="SMS enviados"
        value="list-sms"
        icon={<Message />}
      />

      <BottomNavigationAction
        onClick= { handleLogout }
        label="Sair"
        icon={ <Logout />} 
      />
      
    </BottomNavigation>
  );
}
