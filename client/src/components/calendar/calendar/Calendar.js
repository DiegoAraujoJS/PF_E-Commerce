import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "daypilot-pro-react";
import "./CalendarStyles.css";
import axios from "axios";

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
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    var email=this.props.email
    this.state = {
      viewType: "Week",
      durationBarVisible: true,
      timeRangeSelectedHandling:"disabled"
      ,
      onTimeRangeSelected: async (args) => {
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
        await axios.post('http://localhost:3001/api/calendario/add', horario1)

      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
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
          await axios.put('http://localhost:3001/api/calendario/edit', ocupado1)
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
          await axios.post('http://localhost:3001/api/calendario/add', disponible1)
        }
        console.log(e.data.backColor)
        dp.events.update(e);
      },
    };
  }

  async componentDidMount() {

    // load event data
    
    var email=this.props.email
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

      ;

      
      
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
    var { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            skipMonths={1}
            startDate={date(today, "yy/mm/dd")}
            selectionDay={date(today, "yy/mm/dd")}
            onTimeRangeSelected={(args) => {
              this.setState({
                startDate: args.day,
              });
            }}
          />
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
