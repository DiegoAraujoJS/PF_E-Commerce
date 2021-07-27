import React, { Component } from "react";
import { Clasesregulares } from "./clasesregulares";
import getCookieValue from "../../../cookieParser";
import {
  DayPilot,
  DayPilotDate,
  DayPilotCalendar,
  DayPilotNavigator
} from "daypilot-pro-react";
import "./CalendarStyles.css";
import axios from "axios";

let RoleAdmin = 2

const today = new Date();
const date = (fecha, formato) => {};
const profesorEjemplo = [
  {
    start: "2021-07-07T10:30:00",
    end: "2021-07-07T13:00:00",
    text: "Nose",
    id: 1,
  },
  {
    start: "2021-07-08T10:30:00",
    end: "2021-07-08T13:00:00",
    text: "Miercoles",
    id: 2,
  },
  {
    start: "2021-07-09T10:30:00",
    end: "2021-07-09T13:00:00",
    text: "Martes",
    id: 3,
  },
];

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "20px",
    marginLeft: "20px",
  },
  main: {
    flexGrow: "1",
    marginRight: "20px",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    var email=this.props.email
    this.state = {
      allowEventOverlap: false,
      isUser: false,
      token: '',
      viewType: "Week",
      durationBarVisible: true,
      timeRangeSelectedHandling:"disabled"
      ,
      onTimeRangeSelected: async (args) => {
        if (this.state.isUser) {
          const dp = this.calendar;
          const modal = await DayPilot.Modal.prompt(
            "Create a new event:",
            "Disponible"
          );
          dp.clearSelection();
          if (!modal.result) { return; }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            moveDisabled: true,
          resizeDisabled: true,
          });
          const año=args.start.value.slice(0,-15)
          const mes=args.start.value.slice(5,-12)
          const dia=args.start.value.slice(8,-9)
          const start=args.start.value.slice(11)
          const end=args.end.value.slice(11)
          const horario1={
            disponible: [[start,  end]],
            email: email,
            fecha: {
                anio: año,
                mes: mes,
                dia: dia
            }
        } 
          console.log(email)
          console.log("Token",this.state.token)
          await axios.post('http://localhost:3001/api/calendario/add', horario1, {headers: {Authorization: this.state.token}})
  
        }
        },
        onEventDelete:async  function(args) {
            if(this.isUser){
            console.log(args.e.data.start.value)
            const año=args.e.data.start.value.slice(0,-15)
            const mes=args.e.data.start.value.slice(5,-12)
            const dia=args.e.data.start.value.slice(8,-9)
            const start=args.e.data.start.value.slice(11)
            const end=args.e.data.end.value.slice(11)
            let horario1
            if(args.e.data.text==="Disponible"){
            horario1={
              disponible: [[start,  end]],
              email: email,
              fecha: {
                  anio: año,
                  mes: mes,
                  dia: dia
              }
          } }
          else if(args.e.data.text==="Ocupado"){
            horario1={
              ocupado: [[start,  end]],
              email: email,
              fecha: {
                  anio: año,
                  mes: mes,
                  dia: dia
              }
          } }
          await axios.put('http://localhost:3001/api/calendario/delete', horario1, {headers: {Authorization: this.token}})
        }
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        console.log("BOrrar")
        if (this.state.isUser){
          const dp = this.calendar;
          const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
          if (!modal.result) { return; }
          const e = args.e;
          e.data.text = modal.result;
          if(e.data.text==="Ocupado"){
            const año2=e.data.start.value.slice(0,-15)
            const mes2=e.data.start.value.slice(5,-12)
            const dia2=e.data.start.value.slice(8,-9)
            const start2=e.data.start.value.slice(11)
            const end2=e.data.end.value.slice(11)
            const ocupado1={
              ocupado: [[start2,  end2]],
              email: email,
              fecha: {
                  anio: año2,
                  mes: mes2,
                  dia: dia2
              }
          }
            e.data.backColor="red"
            await axios.put('http://localhost:3001/api/calendario/edit', ocupado1, {headers: {Authorization: this.state.token}})
          }
          if(e.data.text==="Disponible"){
            const año3=e.data.start.value.slice(0,-15)
            const mes3=e.data.start.value.slice(5,-12)
            const dia3=e.data.start.value.slice(8,-9)
            const start3=e.data.start.value.slice(11)
            const end3=e.data.end.value.slice(11)
            const disponible1={
              disponible: [[start3,  end3]],
              email: email,
              fecha: {
                  anio: año3,
                  mes: mes3,
                  dia: dia3
              }
          }
            e.data.backColor="blue"
            await axios.post('http://localhost:3001/api/calendario/add', disponible1, {headers: {Authorization: this.state.token}})
          }
          console.log(e.data.backColor)
          dp.events.update(e);
        }
      },
    };
  }
  async componentDidMount() {

    // load event data
    
    const token = getCookieValue('token').replaceAll("\"", '')
    const thisUser = await axios.post(`http://localhost:3001/api/verify`, {},{ withCredentials: true, headers: {Authorization: token}})
    this.state.token = token
    const email=this.props.email
    console.log(token)
    const usuario= await (thisUser && (email === thisUser.data.mail))
    if (usuario){
      this.state.isUser = true;
    }
    console.log(this.state.isUser)
    if(email===undefined && localStorage.getItem('user')!==null)email=JSON.parse(localStorage.getItem('user')).mail
    const arrayProf = await axios.get(
      `http://localhost:3001/api/calendario/${email}`
    );
    var tempo = [];
    if(arrayProf.data.length>0){arrayProf.data.map((prof) => {
      let año = prof.fecha.anio.toString();
      let mes = prof.fecha.mes.toString();
      let dia = prof.fecha.dia.toString();
      if (dia.length === 1) {
        dia = "0" + dia;
      }
      if (mes.length === 1) {
        mes = "0" + mes;
      }
      if(prof.disponible){prof.disponible.map((disp)=>{
        tempo.push({
          start: año + "-" + mes + "-" + dia + "T" + disp[0],
          end: año + "-" + mes + "-" + dia + "T" + disp[1],
          text: "Disponible",
          backColor: "blue",
          moveDisabled: true,
          resizeDisabled: true,
        })
      })}
      if(prof.ocupado){prof.ocupado.map((ocup)=>{
        tempo.push({
          start: año + "-" + mes + "-" + dia + "T" + ocup[0],
          end: año + "-" + mes + "-" + dia + "T" + ocup[1],
          text: "Ocupado",
          backColor: "red",
          moveDisabled: true,
          resizeDisabled: true,  
        })
      })}
      return tempo;
    });}
    const persons = tempo;
    this.setState({
      bubble: null,
      showToolTip: false,
      startDate: date(today, "yy/mm/dd"),
      events: persons,
      width: "40%"
    });
  }
    

  render() {
    const propsEmail={email:this.props.email}
    var { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
         
          <DayPilotNavigator

            selectMode={"week"}
            showMonths={1}
            skipMonths={1}
            startDate={date(today, "yy/mm/dd")}
            selectionDay={"2021-07-15"}
            onTimeRangeSelected={(args) => {
              this.setState({
                startDate: args.day,
              });
            }}
          />
          {/* {this.state.isUser? <Clasesregulares {...propsEmail}/>:null} */}
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...config}
            ref={(component) => {
              this.calendar = component && component.control;
            }}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
