import React, { useEffect, useState } from 'react';
import Navigation from '../menu/Navigation';
import api from '../../services/api';
import { Table } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { Redirect } from 'react-router-dom';
  
const EditUser = () => {
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState('');

    const actionEditUser = (id) => {
      setEdit(id)
    };

    const actionDeleteUser = async (id) => {
      const idUser = parseFloat(id);
      console.log(idUser);

      await api.delete('/user', {
        data: {
          id: idUser
        }
      });
      window.location.reload()
    };

    useEffect( () => {
        api.get('/users')
            .then((response) => setUsers(response.data))
            .catch((err) => console.log(err))
        
    },[]);

    if(edit !== '') {
        return <Redirect to={"/edit-user/" + edit} /> 
    };

    return(
      <>
        <Navigation/>
        <h1>Editar Usuário</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return(
                      <tr key={user.id}>
                          <td>{user.nome}</td>
                          <td>{user.email}</td>
                          <td>
                              <>
                                <IconButton aria-label="delete" onClick={() => actionEditUser(user.id)}>
                                  <EditIcon/>
                                </IconButton>
                              </>
                          </td> 
                          <td>
                              <IconButton aria-label="delete" onClick={() => {if(window.confirm('Deseja exluir usuario?')) actionDeleteUser(user.id)}}>
                                  <DeleteIcon />
                              </IconButton>
                          </td> 
                      </tr>
                    )
                })}        
            </tbody>
        </Table>
      </>
    )
}
export default EditUser