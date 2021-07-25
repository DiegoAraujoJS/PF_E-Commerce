import { Disponible, IDate, IClase, Ocupado, Time, Week } from "../../interfaces";
import mail from "./utils/actions/mailer";
import Clase from "./models/Clase";
import User from "./models/Usuario";
import weeklyToMonthlyCalendar from "./utils/calendarFunctions/weeklyToMonthlyCalendar";
import setNewCalendar from "./utils/calendarFunctions/setNewCalendar";
import Profesor from "./models/Profesor";
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
        .then(async () => {
            // console.log('calendarpayload week', calendarPayload.week, 'for how long', calendarPayload.forHowLong, 'sunday starts on', calendarPayload.sundayStartsOn, 'publisher', publisher.User_mail)
            const monthlyCalendar = weeklyToMonthlyCalendar(calendarPayload.week, calendarPayload.forHowLong, calendarPayload.sundayStartsOn, publisher.User_mail)
            // console.log('monthly calendar', monthlyCalendar)
            for (const available of monthlyCalendar) {
                await setNewCalendar(available)
            }
        })
        .then((r) => {mail(publisher.User_mail, `Felicitaciones ${publisher.name}! Tu clase de ${publication.clase.materia} ya está publicada`,
        `Gracias por confiar en E Clases Online. Su clase online está muy cerca. Ahora tienes que esperar a que un ${publisherRole} quiera tomar tu clase`)})
        .catch(err => console.log(err))
    }
}
const market = new MarketFlow()

export default market