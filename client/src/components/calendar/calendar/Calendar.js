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
console.log(profesorEjemplo);
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
    var login=false
    var booleano
    if(login===true){
      booleano="Enabled"
    } else {
      booleano="Disabled"
    }
    this.state = {
      viewType: "WorkWeek",
      durationBarVisible: true,
      timeRangeSelectedHandling: booleano
      ,
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "Event 1"
        );
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  async componentDidMount() {

    // load event data
    console.log("Esto es el calendario",this.props.email)
    var email=this.props.email
    if(email===undefined && localStorage.getItem('user')!==null)email=JSON.parse(localStorage.getItem('user')).mail
    console.log("Esto es email si undefined", email)
    const arrayProf = await axios.get(
      `http://localhost:3001/api/calendario/${email}`
    );
    console.log("ARRAYPROF", arrayProf)
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
      console.log("PROF",prof)
      tempo.push({
        start: año + "-" + mes + "-" + dia + "T" + prof.disponible[0][0],
        end: año + "-" + mes + "-" + dia + "T" + prof.disponible[0][1],
        text: "Disponible",
        backColor: "blue",
        moveDisabled: true,
        resizeDisabled: true,
        
      });
      
      console.log("TEMPO", tempo)
      return tempo;
    });}

    console.log("Tempo", tempo);

    const persons = tempo;
    console.log("Nuevo profe", arrayProf.data);
    this.setState({
      bubble: null,
      showToolTip: false,
      startDate: date(today, "yy/mm/dd"),
      events: persons,
    });

    /*     .then((res) => {
        var tempo = [];

        for (var i = 0; i < res.data.length; i++) {
          let año = res.data[i].fecha.anio.toString();
          let mes = res.data[i].fecha.mes.toString();
          let dia = res.data[i].fecha.dia.toString();
          if (dia.length === 1) {
            dia = "0" + dia;
          }
          if (mes.length === 1) {
            mes = "0" + mes;
          }
          tempo.push({
            start:
              año + "-" + mes + "-" + dia + "T" + res.data[i].disponible[0][0],
            end:
              año + "-" + mes + "-" + dia + "T" + res.data[i].disponible[0][1],
            text: "Disponible troesma",
            backColor: "red",
            moveDisabled: true,
            resizeDisabled: true,
            toolTop: "hola manito",
          });
          tempo.push({
            start:
              año + "-" + mes + "-" + dia + "T" + res.data[i].ocupado[0][0],
            end: año + "-" + mes + "-" + dia + "T" + res.data[i].ocupado[0][1],
            text: "Ocupado troesma",
          });
        }//ACA TERRMINA EL FOR
        console.log("Tempo", tempo);

        const persons = tempo;
        console.log("Nuevo profe", res);
        this.setState({
          bubble: null,
          showToolTip: false,
          startDate: date(today, "yy/mm/dd"),
          events: persons,
        });
      }); */
  } // aca termina el didmount
  /* start: "2021-07-07T10:30:00",
      end: "2021-07-07T13:00:00",
      text: "Esto es del back",
 */

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
