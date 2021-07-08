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
    this.state = {
      viewType: "WorkWeek",
      durationBarVisible: true,
      timeRangeSelectedHandling: "Disabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "Event 1"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
      },
    };
  }

  componentDidMount() {
    // load event data
    axios.get(`http://localhost:3001/api/profesores/calendar/1`).then((res) => {
      const persons = res.data;
      this.setState({
        startDate: date(today, "yy/mm/dd"),
        events: persons,
      });
    });
  }

  render() {
    var { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            startDate={"2021-10-15"}
            selectionDay={"2021-10-15"}
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
