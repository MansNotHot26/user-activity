import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { userContext } from "../Context";
import moment from "moment";
import DatePicker from "../components/DatePicker";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: "60%",
    left: "52%",
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginTop: "10px",
  },
  startTime: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "darkturquoise",
  },

  endTime: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "red",
  },
  error: {
    fontWeight: "bold",
    color: "red",
    fontSize: "x-large",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [state, setState] = useContext(userContext);
  const { members, open, id, selectedDate } = state;
  const newSelectedDate = moment(selectedDate).format("MMM D YYYY");
  const date = new Date();
  const today = moment(date).format("MMM D YYYY");

  const handleClose = () => {
    setState({ ...state, open: false, selectedDate: new Date() });
  };

  const timeRange = members
    ? members
        .map((data) => {
          if (data.id === id) {
            return data.activity_periods;
          }
          return null;
        })
        .filter((item) => item)
    : 0;

  let timePeriod = members
    ? timeRange
        .flat()
        .map((item) => {
          const newDate1 = item.start_time
            .split(" ")
            .slice(0, 3)
            .join(" ")
            .trim();
          const newDate2 = item.end_time
            .split(" ")
            .slice(0, 3)
            .join(" ")
            .trim();
          if (newDate1 === today && newDate2 === today) {
            return [item.start_time, item.end_time];
          } else return null;
        })
        .filter((item) => item)
    : 0;

  timePeriod = members
    ? timeRange
        .flat()
        .map((item) => {
          const newDate1 = item.start_time
            .split(" ")
            .slice(0, 3)
            .join(" ")
            .trim();
          const newDate2 = item.end_time
            .split(" ")
            .slice(0, 3)
            .join(" ")
            .trim();
          if (newDate1 === newSelectedDate && newDate2 === newSelectedDate) {
            return [item.start_time, item.end_time];
          } else return null;
        })
        .filter((item) => item)
    : 0;

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">User Activity On {newSelectedDate} :</h2>
      {timePeriod.length > 0 ? (
        timePeriod.map((item, index) => (
          <div key={index}>
            <div className={classes.startTime}>
              <span>
                Start Time : {item[0].split(" ").slice(3).join(" ").trim()}
              </span>
            </div>
            <div className={classes.endTime}>
              <span>
                End Time : {item[1].split(" ").slice(3).join(" ").trim()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className={classes.error}>No activity on this day</div>
      )}

      <DatePicker />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
