import React, { useState, useEffect } from 'react';
import Navigation from '../menu/Navigation';
import api from '../../services/api';
import { Table } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const ListClient = () => {
const [clients, setClients] = useState([]);
const [edit, setEdit] = useState('');
const [warning, setWarning] = useState('');

const actionEditClient = (id) => {
    setEdit(id)
};

const actionDeleteUser = async (id) => {
    const id_client = parseFloat(id);
    console.log(id_client);

    await api.delete('/client', {
    data: {
        id: id_client
    }
    });
    window.location.reload()
};

useEffect( () => {
   const fetch = async () => {
        const response = await api.get('/clients');
        if(response.data.warning === true) {
            return setWarning('Não há itens cadastrados')
        }

        setClients(response.data)
        console.log(response)
    }

    fetch();

},[]);

if(edit !== '') {
    return <Redirect to={"/edit-client/" + edit} /> 
};
    return(
        <>
            <Navigation />
            <h1>Listando Clientes</h1>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => {
                    return(
                      <tr key={client.id}>
                          <td>{client.nome}</td>
                          <td>{client.email}</td>
                          <td>{client.telefone}</td>
                          <td>
                              <>
                                <IconButton aria-label="delete" onClick={() => actionEditClient(client.id)}>
                                  <EditIcon/>
                                </IconButton>
                              </>
                          </td> 
                          <td>
                              <IconButton aria-label="delete" onClick={() => {if(window.confirm('Deseja exluir cliente?')) actionDeleteUser(client.id)}}>
                                  <DeleteIcon />
                              </IconButton>
                          </td> 
                      </tr>
                    )
                })}        
            </tbody>
        </Table>
        {warning !== '' &&
            <Alert variant="danger">{warning}</Alert>
        }
        </>
    )
}

export default ListClient