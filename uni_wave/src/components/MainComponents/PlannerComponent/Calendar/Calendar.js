import React, { useState, useRef, useEffect } from "react";
import "./Calendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "../../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { format, parseISO } from "date-fns";

import DatePicker from "react-datepicker";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AlertWarning from "../../../Alerts/AlertWarningCalendar.js";

import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  getCalendar,
  deleteEvent,
  updateEvent
} from "../../../../store/actions/calendarAction.js";

import { io } from "socket.io-client";

const locales = {
  "en-UK": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function StudentCalendar(props) {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);
  const { calendarList } = useSelector((state) => state.calendar);

  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  useEffect(() => {
    dispatch(getCalendar());
  }, []);

  // When an event is edited
  useEffect(() => {
    socket.current.on("update-calendar", () => {
      dispatch(getCalendar()); // Fetch updated todo list
    });
    return () => socket.current.off("update-calendar");
  }, [dispatch]);

  // Add event popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //warning alert popup
  const [warningVisible, setWarningVisible] = useState(false);

  //create a new event
  const [newEvent, setNewEvent] = useState({
    senderId: userInfo.id,
    senderName: userInfo.username,
    title: "",
    allDay: false,
    start: "",
    end: "",
  });

  //adding the events to the calendar
  function handleAddEvent() {
    if (newEvent.start < newEvent.end) {
      setWarningVisible(false);
      dispatch(addEvent(newEvent));
      //setAllEvents([...allEvents, newEvent]);
      handleClose();
    } else {
      setWarningVisible(true);
    }
  }

  const allEvents = calendarList.map((event) => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
    allDay: false, // or use `event.allDay` if the field is present in the database
    title: event.title,
  }));

  // Events only for user who created them
  const eventsForUser = allEvents.filter((event) => {
    return event.senderName === userInfo.username;
  });

  /* --------------------- Update event popup --------------------- */
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  // Selected event state
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDeleteEvent = () => {
    //confirmation window for deleting an event
    const r = window.confirm("Would you like to remove this event?");

    if (r === true) {
      if (selectedEvent) {
        //console.log(selectedEvent._id);
        // dispatch the deleteEvent action with the id of the selected event
        dispatch(deleteEvent(selectedEvent._id)); 
      }
      handleCloseUpdate();
    }
  };

  /* ------------ UPDATE EVENT ---------------- */
  const titleRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  useEffect(() => {
    if (selectedEvent) {
      titleRef.current.value = selectedEvent.title;
      startRef.current.value = selectedEvent.start;
      endRef.current.value = selectedEvent.end;
    }
  }, [selectedEvent]);

  //update the event selected
  async function updateSelectedEvent() {
    if (startRef.current.value < endRef.current.value) {
      setWarningVisible(false);
      //confirmation window for updating an event
      const r = window.confirm("Would you like to update this event?");
      if (r === true) {
        const updatedEvent = {
          ...selectedEvent,
          title: titleRef.current.value,
          start: startRef.current.value,
          end: endRef.current.value,
        };
        await dispatch(updateEvent(updatedEvent));
        socket.current.emit("update-calendar", updatedEvent);
        handleCloseUpdate();
      }
    } else {
      setWarningVisible(true);
    }
  }

  /* ------------------------------------------ */

  return (
    <>
      {/* Change Backgroung Color of the Page */}
      {props.pageColor ? (
        <style>
          {
            ".calendar { background-color: #0410574f !important; } .rbc-toolbar {color: white !important;} .rbc-toolbar button {color: #5f43dd !important;} .rbc-row { color: #ffffff !important;} .rbc-month-view {color: white !important;} .rbc-month-row {color: white !important;} .rbc-agenda-view {color: white !important;} .rbc-day-slot .rbc-event-content {color: white !important;} .rbc-time-view { color: white !important;}"
          }
        </style>
      ) : (
        <>
          <style>{"body { background-color: #5e73eb5 !important;}"}</style>
        </>
      )}
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={eventsForUser}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            handleShowUpdate();
          }}
        />

        <Button
          className="buttonAddEvent"
          variant="primary"
          onClick={handleShow}
        >
          Add Event
        </Button>

        {/* Add A New Event Window */}
        <Modal className="add-event-calendar" show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="addEventHead">Add A New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body className="event-content-add">
            <input
              className="name-of-event"
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              className="pick-start-date"
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              value={newEvent.start}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <DatePicker
              className="pick-end-date"
              placeholderText="End Date"
              selected={newEvent.end}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close-event"
              variant="secondary"
              onClick={() => {
                handleClose();
                setWarningVisible(false);
              }}
            />
            <Button
              className="save-event"
              variant="primary"
              onClick={handleAddEvent}
            >
              Save Event
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update & Delete Window */}
        <Modal
          className="update-delete-event-calendar"
          show={showUpdate}
          onHide={handleCloseUpdate}
        >
          <Modal.Header>
            <Modal.Title className="updateDeleteEventHead">
              Update Or Delete An Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="event-content-add">
            <input
              className="name-of-event"
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              /*value={newEvent.title}
              onChange={(e) => {
                setNewEvent({ ...newEvent, title: e.target.value });
                //update the title state with the last input
                setTitleEvent(e.target.value);
              }}*/
              ref={titleRef}
              //value={selectedEvent ? selectedEvent.title : ""}
            />
            <DatePicker
              selected={selectedEvent ? new Date(selectedEvent.start) : null}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="pick-start-date"
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              onChange={(start) => {
                if (selectedEvent) {
                  setSelectedEvent({ ...selectedEvent, start });
                }
              }}
              ref={startRef}
            />
            <DatePicker
              className="pick-end-date"
              placeholderText="End Date"
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              selected={selectedEvent ? new Date(selectedEvent.end) : null}
              onChange={(end) => {
                if (selectedEvent) {
                  setSelectedEvent({ ...selectedEvent, end });
                }
              }}
              ref={endRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close-event"
              variant="secondary"
              onClick={() => {
                setSelectedEvent(null);
                handleCloseUpdate();
              }}
            />
            <Button
              className="save-event"
              variant="primary"
              onClick={() => {
                updateSelectedEvent();
              }}
            >
              Update Event
            </Button>
            <Button
              className="delete-event"
              variant="danger"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Alert Popups */}
        {warningVisible && <AlertWarning />}
      </div>
    </>
  );
}
