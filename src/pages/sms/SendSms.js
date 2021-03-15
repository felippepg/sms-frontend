import React, { useState, useEffect }from 'react';
import Navigation from '../menu/Navigation';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputGroup, FormControl, Button, Alert, Form } from 'react-bootstrap';
import FlashMessage from 'react-flash-message';

const SendSms = () => {
    const [clients, setClients] = useState([]);
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [warning, setWarning] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(true);
    const [errorCaracter, setErrorCaracter] = useState('');

    const aux = (e) => {
      setMessage(e.target.value)
      setCount(e.target.value.length)

      if(message.length >= 140) {
        setLimit(false)
        return setErrorCaracter('Limite de carateres excedido')

      } else {
        setLimit(true)
        setErrorCaracter('')
      }
    }

    useEffect(() => {
        const fetch = async() => {
            const response = await api.get('/clients');
            if(response.data.warning === true) {
              return setWarning('Cadastre um cliente para realizar o envio de SMS');
            }
            setClients(response.data);
        }

        fetch()
    },[])

    const getClient = (client) => {
      setPhone(client.telefone.replace(/[^0-9]+/g,''));
      setId(parseFloat(client.id));
    }

    const sendData = async (e) => {
      e.preventDefault()
      setError('');

      const response = await api.post('/sms-send', {
        id: id,
        message: message,
        number: phone
      });

      console.log(response.data)
      if(response.data.erro) {
        return setError(response.data.erro)
      }

      if(response.data.success) {
        setMessage('');
        return setSuccess(response.data.success);
      }
    }
    return(
        <>
            <Navigation />
            <h1>Enviar SMS</h1>
            {clients.length === 0 &&
                <Alert variant="danger">{warning}</Alert>
            }
            <Form onSubmit={ sendData }>
              <Autocomplete
                id="combo-box-demo"
                options={ clients }
                getOptionLabel={(option) => option.nome}
                noOptionsText="Não há clientes cadastrados"
                style={{ width: 300 }}
                onChange={(event, value) => {getClient(value)}}
                renderInput={(params) => <TextField {...params} label="Selecione o nome do Cliente" variant="outlined" />}
            />
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Mensagem</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  as="textarea" 
                  aria-label="With textarea" 
                  value={message} 
                  onChange={e => aux(e)}
                />
              </InputGroup>
              <p>Limite de 140 caracteres: {count}</p>
              
              <div className="mb-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  type="submit"
                  disabled={clients.length === 0 || limit === false ? true: false}
                >
                  Enviar Mensagem
                </Button>{' '}
              </div>
            </Form>
                        
            { success  !== '' &&
              <FlashMessage duration={5000}>
                  <Alert variant="success">{success}</Alert>
              </FlashMessage>
            }

            { error !== '' && 
                <FlashMessage duration={5000}>
                    <Alert variant="danger">{error}</Alert>
                </FlashMessage>
            }
            { errorCaracter !== '' &&
                <Alert variant="danger">{errorCaracter}</Alert>
            }

        </>

    )
}

export default SendSms;
