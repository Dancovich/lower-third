import { useEffect, useMemo, useState } from "react"
import { Col, Container, Fade, Row } from "react-bootstrap"

import backgroundAmericanish from './assets/americanish.png'
import backgroundCockroach from './assets/cockroach.png'
import backgroundEd209 from './assets/ed209.png'
import backgroundEngrish from './assets/engrish.png'
import backgroundGigger from './assets/gigger.png'
import backgroundHornet from './assets/hornet.png'
import backgroundKubrick from './assets/kubrick.png'
import backgroundMimic from './assets/mimic.png'
import backgroundMode7 from './assets/mode7.png'
import backgroundPauseCutscene from './assets/pause_cutscene.png'
import backgroundStorms from './assets/storms.png'
import backgroundTimpani from './assets/timpani.png'
import backgroundWaterfall from './assets/waterfall.png'

type FileData = {
  titulo?: string,
  descricao?: string,
  extra?: string
}

type File = {
  tipo?: string,
  jogador?: string,
  dados?: FileData[],
}

declare global {
    interface Window {
        jsonFiles: [File]
        TEMPO_MAXIMO: number
        TEMPO_MINIMO: number
    }
}

export default function App() {
  const files = useMemo(() => window.jsonFiles, [])
  const minTime = useMemo(() => window.TEMPO_MINIMO * 1000, [])
  const maxTime = useMemo(() => window.TEMPO_MAXIMO * 1000, [])

  const [show, setShow] = useState(false)
  const [currentFile, setCurrentFile] = useState<File | undefined>()  
  const [currentDataIndex, setCurrentDataIndex] = useState(-1)
  const [currentData, setCurrentData] = useState<FileData | undefined>()

  useEffect(() => {
    let isMounted = true
    let timeoutId = 0

    if (!show) {
      const deltaTime = maxTime - minTime
      const randomTime = (Math.floor(Math.random() * (deltaTime + 1))) + minTime

      console.log(`Próximo lowerthird: ${randomTime / 1000} segundos`)
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setShow(true)
        }
      }, randomTime)
    } else {
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setShow(false)
        }
      }, 16000)
    }

    return (() => {
      isMounted = false
      clearTimeout(timeoutId)
    })
  }, [maxTime, minTime, show])


  useEffect(() => {
    if (!show) {
      return
    }

    if (!files || files.length <= 0) {
      return
    }

    const maxFileIndex = files.length
    const randomFileIndex = Math.floor(Math.random() * maxFileIndex)

    const file = files[randomFileIndex]
    const data = file.dados

    if (!data || data.length <= 0) {
      return
    }

    const maxDataIndex = data.length
    const randomDataIndex = Math.floor(Math.random() * maxDataIndex)

    const selectedData = data[randomDataIndex]

    setCurrentFile(file)
    setCurrentDataIndex(randomDataIndex)
    setCurrentData(selectedData)
  }, [files, show])

  const padNumber = (value: number, pad: number) => String(value).padStart(pad, "0")

  if (!currentFile || !currentData) {
    return <></>
  }

  switch(currentFile?.tipo) {
    case "DICAS DA REVISTA":
      return <MagazineTips title={currentData?.titulo} description={currentData?.descricao} show={show}/>
        
    case "CONTADOR AMERICANISH":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundAmericanish}
        when={currentData.descricao} />

    case "CONTADOR ED-209":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundEd209}
        when={currentData.descricao} />

    case "CONTADOR ENGRISH":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundEngrish}
        when={currentData.descricao} />

    case "CONTADOR KUBRICK":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundKubrick}
        when={currentData.descricao} />

    case "CONTADOR PAUSE NA CUTSCENE":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundPauseCutscene}
        when={currentData.descricao} />

    case "CONTADOR STORMS":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundStorms}
        when={currentData.descricao} />
    
    case "CONTADOR MODE 7":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundMode7}
        when={currentData.descricao} />
    
    case "CONTADOR MIMIC":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundMimic}
        when={currentData.descricao} />
    
    case "CONTADOR AMIGA VESPA":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundHornet}
        when={currentData.descricao} />
    
    case "CONTADOR CACHOEIRA 60FPS":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundWaterfall}
        when={currentData.descricao} />
    
    case "CONTADOR TÍMPANO":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundTimpani}
        when={currentData.descricao} />
    
    case "CONTADOR BARATA":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundCockroach}
        when={currentData.descricao} />
    
    case "CONTADOR H. R. GIGGER":
      return <Counter show={show}
        type={currentFile.tipo}
        count={padNumber(currentDataIndex + 1, 3)}
        game={currentData.titulo}
        image={backgroundGigger}
        when={currentData.descricao} />
      

    case "JOGUEI A TOALHA":
    case "ZERADO NO CFX":
    case "BACKLOG DO CFX":
    default:
      return <ListEntries type={currentFile?.tipo} 
        title={currentData?.titulo} 
        detail={currentData?.descricao} 
        show={show} />
  }
}

type MagazineTip = { title?: string, description?: string, show: boolean}
function MagazineTips(props: MagazineTip) {
  return <Fade in={props.show}>
    <Container fluid className="magazine-container fixed-bottom p-3">
      <Row style={{marginLeft: 100}} className='magazine-type'>
        <Col>DICAS DA REVISTA</Col>
      </Row>
      <Row style={{marginLeft: 100}} className='magazine-text mt-2'>
        <Col>{props.title}</Col>
      </Row>
      <Row style={{marginLeft: 100}} className='magazine-detail mt-2'>
        <Col>{props.description}</Col>
      </Row>
    </Container>
  </Fade>
}

type ListEntry = { type?: string, title?: string, detail?: string, show: boolean}
function ListEntries(props: ListEntry) {
  return <Fade in={props.show}>
    <Container fluid className="message-container fixed-bottom">
      <Row className='window-title'>
        <Col>&nbsp;</Col>
      </Row>
      <Row style={{ minHeight: 100 }}>
        <Col xs={4} className='message-type align-items-center d-flex' style={{ minHeight: 100 }}>
          <span>{props.type}</span>
        </Col>
        <Col xs={8} className='message-content align-items-center d-flex' style={{ minHeight: 100 }}>
          <div>
            <div className='game-title'>{props.title}</div>
            <div className='game-system'>{props.detail}</div>
          </div>
        </Col>
      </Row>
    </Container>
  </Fade>
}

type CounterProps = { type?: string, game?: string, when?: string, count?: string, image?: string, show?: boolean }
function Counter(props: CounterProps) {
  return <Fade in={props.show}>
    <div className="counter-container position-absolute bottom-0 start-50 translate-middle-x">
      <div className="counter-image" style={{backgroundImage: `url(${props.image})`}}>
        &nbsp;
      </div>
      <div className="counter-content">
        <div>
          <span className="neon-text-green">{props.type}:</span>
          <span className="neon-text-orange">&nbsp;&nbsp;{props.count}</span>
        </div>
        <div>
          <span className="neon-text-green">ONDE.........&nbsp;</span>
          <span className="regular-text-white">{props.game}</span>
        </div>
        <div>
          <span className="neon-text-green">QUANDO...&nbsp;</span>
          <span className="regular-text-white">{props.when}</span>
        </div>
      </div>
    </div>
  </Fade>
}