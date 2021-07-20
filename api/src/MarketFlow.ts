import axios from "axios";
import { Disponible, Horario, IClase, Ocupado, Time } from "../../interfaces";
import Clase from "./models/Clase";
import Profesor from "./models/Profesor";

class MarketFlow {
    listeners: {id: number, cb: () => void}[];

    suscribe(publication: IClase): void {
        let professor = publication.Profesor_mail
        const editCalendar = () => {
            let publicationDate = {anio: publication.date.year, mes: publication.date.month, dia: publication.date.day}
            let editPayload: Ocupado = {email: professor, fecha: publicationDate , ocupado: [publication.date.time]}
            axios.put(`http://localhost:3001/api/calendario/edit`, editPayload)
            // .then (profesor => send mail to profesor)
        }
        // const sendMail = () => {
        //     http post mail/send
        // }
        
        // this.listeners?.push({id: publication.id, cb: editCalendar})
    }

    buy (publication: IClase): void {
        this.listeners?.find(listener => listener.id === publication.id).cb()
    }

    async publish (publication: IClase, token: string): Promise<any> {  
        
        const payload: Disponible = {
            email: publication.Profesor_mail,
            disponible: [publication.date.time], 
            fecha: {
                anio: publication.date.year,
                dia: publication.date.day,
                mes: publication.date.month,
            }, 
        }
        const professor = await Profesor.findByPk(publication.Profesor_mail)
        
        this.suscribe(publication)
        return Clase.create({...publication, materia: publication.materia.normalize("NFD").replace(/\p{Diacritic}/gu, ""), ciudad: professor && professor.city})
        .then(() => {
            axios.post('http://localhost:3001/api/calendario/add', payload, {headers: {Authorization: token}})
        })
        .then(e => publication)
    }
}
const market = new MarketFlow()

export default market