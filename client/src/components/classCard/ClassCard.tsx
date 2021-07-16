import CSS from 'csstype';
import { Class } from './interfaces';
import { Card, Col, Row, /* Button */ } from 'react-bootstrap'
const ClassCard: React.FC<Class> = (props) => {
    const profileImg: CSS.Properties = {
        height: '100px',
        width: '100px',
        borderRadius: '50%',
    };
    const descLimit: CSS.Properties = {
        height: '30px', 
        width: '100%',
        overflow: 'auto',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    };
    const cityPos: CSS.Properties = {
        height: 'fit-content',
        width: 'fit-content',
    };


    return (
        <div>
            <Row className='d-flex justify-content-center'>
                <Col sm={11} md={11}>
                    <Card className="m-3" style={{ backgroundColor: '#c0c0c0' }}> 
                        <Card.Header className='d-flex justify-content-center'>{props.nombre}</Card.Header>
                        <Card.Body className='d-flex flex-row align-items-center'>
                            <img style={profileImg} src={props.profesor && props.profesor.foto} alt={props.profesor && props.profesor.nombre} />
                            <div>
                                <Card.Title >{puntuacion(props.puntuacion)}</Card.Title>
                                <Card.Title>{props && props.materia + ' - ' + props && props.grado + ' - ' + props && props.nivel}</Card.Title>
                                <Card.Text style={descLimit}>
                                    {props && props.descripcion}
                                </Card.Text>
                            </div>
                            <Card.Text style={cityPos}>{props.profesor && props.profesor.ciudad}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


const puntuacion = (num) => {
    return (<>{
        num === 5 ?
            <div><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span></div>
            : num === 4 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
                : num === 3 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
                    : num === 2 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
                        : num === 1 ? <span className="fas fa-star">🌟</span>
                            : <h4>No tiene puntuacion</h4>
    }
    </>
    )
}



export default ClassCard