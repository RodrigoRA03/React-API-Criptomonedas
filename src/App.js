import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [ moneda , guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [cargando, guardarCargando] = useState(false);

  const MethodGet = async (url) =>{
    return await axios.get(url);
  }

  useEffect(() => {
    if(moneda === '') return;
    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    MethodGet(url).then(res=>{
      
      // mostrar el spinner
      guardarCargando(true);

      setTimeout(() => {

     //cambiar el estado de cargando
      guardarCargando(false);

     //guardar cotizacion
     guardarResultado(res.data.DISPLAY[criptomoneda][moneda]);
        
    }, 3000);
    
     
    }).catch(error=>{

    });

  }, [moneda,criptomoneda]);
  
  //Mostrar el spinner o resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/> 
 
  return (
    <Contenedor>
      <div>
        <Imagen
        src={imagen}
        alt='imagen criptomoneda'
        />
      </div>
      <div>
       <Heading>
        Cotiza Criptomonedas al Instante
       </Heading>

       <Formulario
         guardarCriptomoneda={guardarCriptomoneda}
         guardarMoneda={guardarMoneda}
        />

       {componente}
      </div>
    </Contenedor>
  );
}

export default App;
