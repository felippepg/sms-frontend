import React, { useState, useEffect } from 'react';
import Navigation from '../menu/Navigation';
import { Card } from 'react-bootstrap';
import api from '../../services/api';

const ListMessages = () => {
    const [response, setResponse] = useState([]);
    //const [warning, setWarning] = useState('')
    useEffect(() => {
        const fetch = async () => {
            try {
                const resp = await api.get('/sms-message');
                // if(resp.data.length === 0) {
                //     return setWarning('Não há mensagens enviadas')
                // }
                setResponse(resp.data);
            } catch (error) {
                throw new Error(error)
            }
        }

        fetch()
    },[]);

    return(
        <>
            <Navigation />
            <h1>Mensagens enviadas</h1>
            
            <div className="row">

                {response.map((item) => {
                    return(
                    <div className="col-sm-6" key={item.id}>
                        <Card>
                            <Card.Header> Para: {item.nome}</Card.Header>
                            <Card.Body>
                                    <div>{item.messages.map((message, index) => <div key={index}>{message.message}</div>)}</div>
                            </Card.Body>
                        </Card>
                    </div>
                    )
                })}
            </div>

        </>
    )
}

export default ListMessages
