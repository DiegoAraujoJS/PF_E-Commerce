import React, { Component } from "react";
import { Clasesregulares } from "./clasesregulares";
import getCookieValue from "../../../../cookieParser";
import {
  DayPilot,
  DayPilotDate,
  DayPilotCalendar,
  DayPilotNavigator,
} from "daypilot-pro-react";
import "./CalendarStyles.css";
import axios from "axios";
import { connect } from "react-redux";

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
    border: '1px solid blue'
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
    width: '400px'
  },
};
const Lunes=[]

class Calendar extends Component {
  constructor(props) {
    super(props);
    var email=this.props.email
    this.state = {
      horarios: {},
      horariosDispatch: [],
      allowEventOverlap: false,
      isUser: true,
      token: '',
      viewType: "Week",
      heightSpec: "Parent100Pct",
      position: 'none',
        dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        dayNamesShort:['Su','Mo','Tu','We','Th','Fr','Sa'],
        
        timePattern:'h:mm tt',
        datePattern:'M/d/yyyy',
        dateTimePattern:'M/d/yyyy h:mm tt',
      
      durationBarVisible: true,
      timeRangeSelectedHandling:"disabled"
      ,
      onBeforeHeaderRender: function(args) {
        
        
        args.header.html = args.header.start.toString("dddd");

        
        
    },
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
          var day= new Date(args.start)
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
        
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const d = new Date(args.start);

        const dayName = dias[d.getDay()];
        console.log(args.start)
        this.state.horarios[dayName] = this.state.horarios[dayName] ? this.state.horarios[dayName] = {
          ...this.state.horarios[dayName],
          disponible: [...this.state.horarios[dayName].disponible, [start, end]]
        } : this.state.horarios[dayName] = {
          disponible: [[start, end]],
          fecha: {
            anio: año,
            mes:  mes,
            dia:  dia
          },
          email: email
        }
        this.state.horariosDispatch = [...Object.values(this.state.horarios)] 
        console.log(this.state.horariosDispatch)
        console.log('asdfasdf',this.state.horarios)
        let horariosDispatchThroughProps = []
        console.log(this.props.calendar_to_addClassStudent)
        if (this.props.calendar_to_addClassStudent) {
          horariosDispatchThroughProps = this.props.calendar_to_addClassStudent
        }
        console.log('horariosDispatchThroughProps', horariosDispatchThroughProps)

        let dispatchHorarios = []

        Object.keys(this.props.calendar_to_addClassStudent).length === 0 ? props.dispatchHorarios(this.state.horariosDispatch) : props.dispatchHorarios([...this.props.calendar_to_addClassStudent, ...this.state.horariosDispatch])
        
    
  
        }
        },
        onEventDelete:async  function(args) {
            if(this.isUser){
            
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
          
          dp.events.update(e);
        }
      },
    };
  }
  async componentDidMount() {

    let placeholder = document.querySelectorAll('.calendar_default_colheader')
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]
    let i=0;
    for (const x of placeholder){
      
      x.firstChild.innerHTML = dias[i]
      i += 1
    }
    // load event data
    console.log("thisprop", this.props)
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
    
    var tempo = [];
    const arrayProf = this.props.calendar_to_addClassStudent ? {data: this.props.calendar_to_addClassStudent} : {data:[]}
    console.log("ArrayProf", arrayProf)
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
      const date = new Date
      
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
      
      return tempo;
    });}
    const persons = tempo;
    this.setState({
      bubble: null,
      showToolTip: false,
      startDate: date(today, "yy/mm/dd"),
      events: persons,
    });
  }
    

  render() {
    const propsEmail={email:this.props.email}
    var { ...config } = this.state;
    return (
      
        
        
          <DayPilotCalendar
            {...config}
            ref={(component) => {
              this.calendar = component && component.control;
            }}
            children={{}}
          />
        
      
    );
  }
}

const connectDispatchToProps = (dispatch) => {
  return {
    dispatchHorarios: (horarios) => dispatch({
      type: 'CALENDAR_TO_ADDCLASS',
      payload: horarios
    })
  }
}

export default connect(null, connectDispatchToProps)(Calendar);