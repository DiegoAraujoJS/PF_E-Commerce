import { Carousel } from "react-bootstrap";
import Image from 'react-bootstrap/Image' 
import {useState} from 'react'
import image1 from '../../images/arriba-hombre-haciendo-notas-librox1000(1).png'
import image2 from '../../images/estudiante-femenino-eligiendo-curso-aprender-distancia_1163-4837.jpg'
import image3 from '../../images/concepto-educacion-libros-computadora-portatil-biblioteca_1150-10586.jpg'
import './Carousel.css'
function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
        
  
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className= "h-100">
      <Carousel.Item className="h-100">
        

        <img
        className="d-block w-100"
          src={image1}
          alt="First slide"
          
        />
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="h-100">
      

      <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
          
        />
      
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="h-100">
          
          <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          
        />
      
          

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel