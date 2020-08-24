/**React */
import React from 'react';
import { useState,useEffect } from 'react';
/**Librerias */
import styled from '@emotion/styled';
import axios from 'axios';
/**Componentes */
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
 margin-top: 20px;
 font-weight: bold;
 font-size: 20px;
 padding: 10px;
 background-color: #66a2fe;
 border: none;
 width: 100%;
 border-radius: 10px;
 color: #FFF;
 transition: background-color .3s ease;

 &:hover{
     background-color: #326AC0;
     cursor:pointer;
 }


`;
const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listaCripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXM', nombre: 'Peso Mexicano '},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}

    ]
    //utilizar useMoneda 
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda','',MONEDAS);

    //utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda','',listaCripto);
    
    const MethodGet = async (url) =>{
      return await axios.get(url);
    }
    //ejecutar un llemado a la API 
    useEffect(() => {
        let url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        MethodGet(url).then(res=>{
         guardarCriptomonedas(res.data.Data);
        }).catch(error=>{
          console.log(error);
        });
        

    }, []);

    //cuando el usuario hace submit
    const guadarMoneda = e =>{
        e.preventDefault();

        //Validar si ambos campos estan llenos 
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal
        guardarError(false);
        guardarCriptomoneda(criptomoneda);
        guardarMoneda(moneda);

    }

    return (
        <form onSubmit={guadarMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton type="submit" value="Calcular" />
        </form>
    )
}

export default Formulario;
