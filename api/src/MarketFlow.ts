import { Disponible, IDate, IClase, Ocupado, Time, Week } from "../../interfaces";
import mail from "./utils/actions/mailer";
import Clase from "./models/Clase";
import User from "./models/Usuario";
import weeklyToMonthlyCalendar from "./utils/calendarFunctions/weeklyToMonthlyCalendar";
import setNewCalendar from "./utils/calendarFunctions/setNewCalendar";
class MarketFlow {
    listeners: {id: number, cb: () => void}[];

    buy (publication: IClase): void {
        let listener = this.listeners?.find(listener => listener.id === publication.id)
        if (listener) listener.cb()
    }

    async publishDemand (publication: {clase: IClase, agenda: {week: Week[], sundayStartsOn: IDate, forHowLong: number}}, token: string): Promise<any> {  
        
        const calendarPayload = publication.agenda
        const [publisher, publisherRole] = publication.clase.Profesor_mail ? [await User.findByPk(publication.clase.Profesor_mail), 'profesor'] : [await User.findByPk(publication.clase.User_mail), 'alumno']

        return Clase.create({...publication.clase, materia: publication.clase.materia.normalize("NFD").replace(/\p{Diacritic}/gu, ""), ciudad: publisher.city})
        .then(() => {
            let promises = []
            const monthlyCalendar = weeklyToMonthlyCalendar(calendarPayload.week, calendarPayload.forHowLong, calendarPayload.sundayStartsOn, publisher.User_mail)
            for (const available of monthlyCalendar) {
                promises.push( setNewCalendar(available))
            }
            return Promise.all(promises)
        })
        .then((r) => mail(publisher.User_mail, `Felicitaciones ${publisher.name}! Tu clase de ${publication.clase.materia} ya está publicada`,
        `Gracias por confiar en E Clases Online. Su clase online está muy cerca. Ahora tienes que esperar a que un ${publisherRole} quiera tomar tu clase`))
        .catch(err => console.log(err))
    }
}
const market = new MarketFlow()

export default market