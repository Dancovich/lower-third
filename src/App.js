import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Fade, Row } from 'react-bootstrap';
import './App.css';

function App() {
  const [firstTime, setFirstTime] = useState(true);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('ZERADO NO CFX');
  const [title, setTitle] = useState('Nome do Jogo');
  const [detail, setDetail] = useState('Sistema');

  const files = useMemo(() => window.jsonFiles, []);

  const scheduleHide = useCallback(() => {
    setTimeout(() => setShow(false), 10000);
  }, []);

  useEffect(() => {
    const asyncCall = async () => {
      if (typeof(files) === 'undefined' || files === null || files.length === 0) {
        return;
      }

      if (show !== true) {
        let fileIndex = -1;
        while (fileIndex < 0 || fileIndex > files.length - 1) {
          fileIndex = Math.round(Math.random() * files.length) | 0;
        }
        
        let data = files[fileIndex];

        if (data !== null) {
          let entry = -1;
          while (entry < 0 || entry > data['dados'].length - 1) {
            entry = Math.round(Math.random() * data['dados'].length) | 0;
          }
          const entryData = data['dados'][entry];

          // Entre 1 e 10 minutos
          let randomTime = 0;

          if (firstTime === true) {
            randomTime = 5000;
            setFirstTime(false);
          } else {
            randomTime = (Math.random() * ((window.TEMPO_MAXIMO * 1000) - (window.TEMPO_MINIMO * 1000)) + (window.TEMPO_MINIMO * 1000)) | 0;
            console.log('Lower Third - Próximo evento em ' + (randomTime / 1000) + ' segundos');
          }
          //let randomTime = 5000;
          randomTime = randomTime | 0;

          setTimeout(() => {
            setType(data['tipo']);
            setTitle(entryData['titulo']);
            setDetail(`${data['jogador']} - ${entryData['descricao']}`);
            setShow(true);

            scheduleHide();
          }, randomTime);
        } else {
          setShow(null);
          scheduleHide();
        }
      }
    };

    asyncCall();
  }, [files, firstTime, scheduleHide, show]);

  return <Fade in={show === true}>
    
    <Container className='message-container' fluid>
      <Row className='window-title'>
        <Col>Minuto do Fato Randomico</Col>
      </Row>
      <Row style={{minHeight: 100}}>
        <Col xs={4} className='message-type align-items-center d-flex' style={{minHeight: 100}}>
          <span>{type}</span>
        </Col>
        <Col xs={8} className='message-content align-items-center d-flex' style={{minHeight: 100}}>
          <div>
            <div className='game-title'>{title}</div>
            <div className='game-system'>{detail}</div>
          </div>
        </Col>
      </Row>
    </Container>
    
  </Fade>;
}

export default App;