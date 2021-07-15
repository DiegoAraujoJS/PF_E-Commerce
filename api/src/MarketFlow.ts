import axios from "axios";
import { Disponible, Horario, Ocupado, Time } from "../../interfaces";
import Clase from "./models/Clase";
import Profesor from "./models/Profesor";

class MarketFlow {
    listeners: {id: number, cb: () => void}[];

    suscribe(publication: Clase): void {
        let professor = publication.profesor
        const editCalendar = () => {
            let publicationDate = {anio: publication.date.year, mes: publication.date.month, dia: publication.date.day}
            let editPayload: Ocupado = {email: professor.User_mail, fecha: publicationDate , ocupado: [publication.date.time]}
            axios.put(`http://localhost:3001/api/calendario/edit`, editPayload)
            // .then (profesor => send mail to profesor)
        }
        // const sendMail = () => {
        //     http post mail/send
        // }

        this.listeners.push({id: publication.id, cb: editCalendar})
    }

    buy (publication: Clase): void {
        this.listeners.find(listener => listener.id === publication.id).cb()
    }

    publish (publication: Clase, token: string): Promise<any> {
        const payload: Disponible = {
            email: publication.profesor.User_mail,
            disponible: [publication.date.time],
            fecha: {
                anio: publication.date.year,
                dia: publication.date.day,
                mes: publication.date.month
            }
        }
        return Clase.create(publication)
        .then(() => {
            axios.post('http://localhost:3001/api/calendario/add', payload, {headers: {Authorization: token}})
        })
        .then(e => publication)
    }
}
const market = new MarketFlow()
