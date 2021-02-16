import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SendMessage from '@material-ui/icons/Send';
import User from '@material-ui/icons/Person'
import { Link } from 'react-router-dom';
import AddUser from '@material-ui/icons/PersonAdd';
import { Redirect } from 'react-router-dom'
import { logout } from '../../services/auth'
import Logout from '@material-ui/icons/ExitToApp'

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
        to="/edit-user"
        label="Editar Usuários"
        value="edit-user"
        icon={<User />} 
      /> 
      <BottomNavigationAction
        onClick= { handleLogout }
        label="Sair"
        icon={ <Logout />} 
      />
    </BottomNavigation>
  );
}
