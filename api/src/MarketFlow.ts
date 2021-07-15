import axios from "axios";
import { Horario, Ocupado, Time } from "../../interfaces";
import Clase from "./models/Clase";
import Profesor from "./models/Profesor";

class MarketFlow {
    listeners: (() => void)[];

    suscribe(publication: Clase): void {
        let professor = publication.profesor
        const editCalendar = () => {
            let publicationDate = {anio: publication.date.year, mes: publication.date.month, dia: publication.date.day}
            let editPayload: Ocupado = {email: professor.User_mail, fecha: publicationDate , ocupado: [publication.date.time]}
            axios.post(`http://localhost:3001/api/calendario/edit`, editPayload)
            // .then (profesor => send mail to profesor)
        }
        this.listeners.push(editCalendar)
    }
}

const market = new MarketFlow()
